import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readDomainRepository = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    if (id) {
      return await prisma.domain
        .findFirst({
          where: { id: id, softDeleted: false },
        })
        .then(async (res) => {
          if (!res)
            throw new NotFoundException({
              message: 'domínio não encontrado',
            })
          return res
        })
    }

    return await prisma.domain.findMany({
      where: { softDeleted: false },
      orderBy: { updatedAt: 'desc' },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
