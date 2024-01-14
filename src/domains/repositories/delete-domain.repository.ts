import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const deleteDomainRepository = async (id: string) => {
  const prisma = new PrismaService()
  try {
    return await prisma.domain
      .update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('domínio não encontrado')
        return `o domínio da organização ${res?.organization} foi removido`
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
