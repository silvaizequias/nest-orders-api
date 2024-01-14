import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrderByCodeRepository = async (code: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findFirst({
        where: { code: code, softDeleted: false },
        include: {
          items: true,
          attachments: true,
          domain: {
            select: {
              id: true,
              organization: true,
            },
          },
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('ordem não encontrada')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
