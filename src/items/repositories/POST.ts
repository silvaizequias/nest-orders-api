import { HttpException, NotFoundException } from '@nestjs/common'
import { CreateItemDto } from './../dto/create-item.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
export const createItem = async (createItemDto: CreateItemDto) => {
  const prisma = new PrismaService()

  try {
    const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
    const { orderCode, code } = createItemDto
    delete createItemDto.orderCode

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order) throw new NotFoundException(`o pedido ${orderCode} não existe`)

    const data: Prisma.ItemCreateInput = {
      ...createItemDto,
      code: code ? code : randomCode,
      order: {
        connect: {
          code: orderCode,
        },
      },
    }
    return await prisma.item.create({ data }).then(async (res) => {
      return JSON.stringify(
        `o item ${res?.code} do pedido ${orderCode} foi criado`,
      )
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
