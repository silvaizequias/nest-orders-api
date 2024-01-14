import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const createOrderRepository = async (createOrderDto: CreateOrderDto) => {
  const prisma = new PrismaService()

  try {
    const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
    const { code, organization } = createOrderDto
    delete createOrderDto.organization

    const domain = await prisma.domain.findFirst({
      where: { organization: organization },
    })
    if (!domain) throw new NotFoundException('dominio não encontrado')

    const data: Prisma.OrderCreateInput = {
      ...createOrderDto,
      code: code ? code : randomCode,
      domain: {
        connect: {
          id: domain.id,
        },
      },
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
