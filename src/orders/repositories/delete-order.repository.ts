import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteOrderRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    await prisma.order
      .update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
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
