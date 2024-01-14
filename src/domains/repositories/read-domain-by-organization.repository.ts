import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const readDomainByOrganizationRepository = async (
  organization?: string,
) => {
  const prisma = new PrismaService()

  try {
    return await prisma.domain
      .findFirst({
        where: { organization: organization, softDeleted: false },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('domínio não encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
