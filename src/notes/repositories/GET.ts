import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const findNotes = async () => {
  const prisma = new PrismaService()
  try {
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

export const findNoteById = async (id?: string) => {
  const prisma = new PrismaService()
  try {
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
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
