import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateNoteDto } from '../dto/create-note.dto'
import { Prisma } from '@prisma/client'

export const createNoteRepository = async (createNoteDto: CreateNoteDto) => {
  const prisma = new PrismaService()
  try {
    const { orderCode } = createNoteDto
    delete createNoteDto?.orderCode

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order) throw new NotFoundException('o pedido ${orderCode} não existe')

    const data: Prisma.NoteCreateInput = {
      ...createNoteDto,
      order: {
        connect: {
          code: orderCode,
        },
      },
    }
    await prisma.note.create({ data })
    return `uma nota foi criada para o pedido ${order?.code}!`
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
