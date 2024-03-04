import { UpdateItemDto } from './../dto/update-item.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

export const updateItem = async (id: string, updateItemDto: UpdateItemDto) => {
  const prisma = new PrismaService()
  try {
    const { orderCode } = updateItemDto
    delete updateItemDto.orderCode

    if (!orderCode) {
      return await prisma.item
        .update({
          where: { id: id, softDeleted: false },
          data: updateItemDto,
        })
        .then(async (res) => {
          return JSON.stringify(`o item ${res?.code} foi atualizado`)
        })
    }

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order)
      throw new NotFoundException(`pedido ${orderCode} não encontrado`)

    const data: Prisma.ItemUpdateInput = {
      ...UpdateItemDto,
      order: {
        connect: {
          code: orderCode,
        },
      },
    }
    return await prisma.item
      .update({
        where: { id: id, softDeleted: false },
        data,
      })
      .then(async (res) => {
        return JSON.stringify(
          `o item ${res?.code} do pedido ${orderCode} foi atualizado`,
        )
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
