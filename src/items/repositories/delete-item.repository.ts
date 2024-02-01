import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteItemRepository = async (id: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.item
      .update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('anexo não encontrado')
        return JSON.stringify(`anexo ${res.code} removido`)
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
