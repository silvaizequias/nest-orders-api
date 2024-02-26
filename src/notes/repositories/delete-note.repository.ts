import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteNoteRepository = async (id: string) => {
  const prisma = new PrismaService()
  try {
    return await prisma.note
      .update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nota não encontrada')
        return `nota removida`
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
