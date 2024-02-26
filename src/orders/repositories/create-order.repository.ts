import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const createOrderRepository = async (createOrderDto: CreateOrderDto) => {
  const prisma = new PrismaService()
  const MANAGEMENT_API_URL = process.env.MANAGEMENT_API_URL!

  try {
    const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
    const { code, organization } = createOrderDto

    const document = await fetch(
      `${MANAGEMENT_API_URL}/organizations/verification/${organization}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const organizationDocument = document && (await document.json())
    if (!organizationDocument?.document)
      throw new NotFoundException(`a organização não existe na plataforma`)

    const data: Prisma.OrderCreateInput = {
      ...createOrderDto,
      code: code ? code : randomCode,
    }
    return await prisma.order.create({ data }).then(async (res) => {
      return JSON.stringify(`o pedido ${res?.code} foi criado`)
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
