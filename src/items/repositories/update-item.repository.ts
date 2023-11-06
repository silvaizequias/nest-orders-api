import { UpdateItemDto } from './../dto/update-item.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

export const updateItemRepository = async (
  id: string,
  updateItemDto: UpdateItemDto,
) => {
  const prisma = new PrismaService()
  try {
    const { orderCode } = updateItemDto
    delete updateItemDto.orderCode

    if (!orderCode) {
      return await prisma.item.update({
        where: { id: id, softDeleted: false },
        data: updateItemDto,
      })
    }

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order) throw new NotFoundException('ordem não encontrada')

    const data: Prisma.ItemUpdateInput = {
      ...UpdateItemDto,
      order: {
        connect: {
          code: orderCode,
        },
      },
    }
    return await prisma.item.update({
      where: { id: id, softDeleted: false },
      data,
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
