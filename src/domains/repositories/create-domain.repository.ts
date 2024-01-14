import { PrismaService } from 'src/prisma/prisma.service'
import { HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CreateDomainDto } from '../dto/create-domain.dto'

export const createDomainRespository = async (
  createDomainDto: CreateDomainDto,
) => {
  const prisma = new PrismaService()

  try {
    const data: Prisma.DomainCreateInput = {
      ...createDomainDto,
    }

    return await prisma.domain.create({ data }).then(async (res) => {
      return `o domínio da organização ${res.organization} foi criado`
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
