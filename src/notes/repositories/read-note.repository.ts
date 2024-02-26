import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readNoteRepository = async (id?: string) => {
  const prisma = new PrismaService()
  try {
    if (id) {
      return await prisma.note
        .findFirst({
          where: { id: id, softDeleted: false },
          include: {
            order: true,
          },
        })
        .then(async (res) => {
          if (!res) return new NotFoundException('nota não encontrada')
          return res
        })
    }

    return await prisma.note.findMany({
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
