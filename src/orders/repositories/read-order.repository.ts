import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrderRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.order
        .findFirst({
          where: { id: id, softDeleted: false },
          include: {
            items: true,
            attachments: true,
          },
        })
        .then(async (res) => {
          if (!res) throw new NotFoundException('ordem não encontrada')
          return res
        })
    }

    return await prisma.order.findMany({
      where: { softDeleted: false },
      include: {
        items: true,
        attachments: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
