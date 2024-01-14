import { PrismaService } from 'src/prisma/prisma.service'
import { HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UpdateDomainDto } from '../dto/update-domain.dto'

export const updateDomainRepository = async (
  id: string,
  updateDomainDto: UpdateDomainDto,
) => {
  const prisma = new PrismaService()

  try {
    const data: Prisma.DomainUpdateInput = {
      ...updateDomainDto,
    }
    return await prisma.domain
      .update({
        where: { id: id, softDeleted: false },
        data,
      })
      .then(async () => {
        return `domínio atualziado`
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
