import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrderByCustomerRepository = async (customer: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findMany({
        where: { customer: customer, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('pedido não encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
