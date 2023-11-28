import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const createOrderRepository = async (createOrderDto: CreateOrderDto) => {
  const prisma = new PrismaService()

  try {
    const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
    const { code } = createOrderDto

    const data: Prisma.OrderCreateInput = {
      ...createOrderDto,
      code: code ? code : randomCode,
    }
    return await prisma.order.create({ data }).then(async (res) => {
      return `a ordem de serviço ${res?.code} foi criada`
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
