import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const findAttachments = async () => {
  const prisma = new PrismaService()

  try {
    return await prisma.attachment.findMany({
      take: 100,
      //skip: 50,
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

export const findAttachmentById = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.attachment
      .findFirst({
        where: { id: id, softDeleted: false },
        include: {
          order: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('anexo não encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
