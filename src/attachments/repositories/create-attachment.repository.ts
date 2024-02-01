import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAttachmentDto } from '../dto/create-attachment.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const createAttachmentRespository = async (
  createAttachmentDto: CreateAttachmentDto,
) => {
  const prisma = new PrismaService()

  try {
    const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
    const { orderCode, code } = createAttachmentDto
    delete createAttachmentDto.orderCode

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order) throw new NotFoundException('ordem não encontrada')

    const data: Prisma.AttachmentCreateInput = {
      ...createAttachmentDto,
      code: code ? code : randomCode,
      order: {
        connect: {
          code: orderCode,
        },
      },
    }

    return await prisma.attachment.create({ data }).then(async (res) => {
      return JSON.stringify(
        `a ordem de serviço ${orderCode} recebeu um anexo ${res?.code}`,
      )
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
