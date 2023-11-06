import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readItemRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.item
        .findFirst({
          where: { id: id, softDeleted: false },
          include: {
            order: true,
          },
        })
        .then(async (res) => {
          if (!res) return new NotFoundException('item não encontrado')
          return res
        })
    }

    return await prisma.item.findMany({
      where: { softDeleted: false },
      include: {
        order: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
