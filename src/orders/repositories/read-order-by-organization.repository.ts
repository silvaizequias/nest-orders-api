import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readOrderByOrganizationRepository = async (
  organization: string,
) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findMany({
        where: { organization: organization, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          attachments: true,
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
