import { HttpException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateNoteDto } from '../dto/update-note.dto'
import { Prisma } from '@prisma/client'

export const updateNote = async (id: string, updateNoteDto: UpdateNoteDto) => {
  const prisma = new PrismaService()
  try {
    const data: Prisma.NoteUpdateInput = {
      ...updateNoteDto,
    }
    await prisma.note.update({ where: { id: id }, data })
    return `a nota foi atualizada`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
