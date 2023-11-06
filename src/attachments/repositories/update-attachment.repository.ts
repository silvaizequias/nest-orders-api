import { UpdateAttachmentDto } from './../dto/update-attachment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const updateAttachmentRepository = async (
  id: string,
  updateAttachmentDto: UpdateAttachmentDto,
) => {
  const prisma = new PrismaService()

  try {
    const { orderCode } = updateAttachmentDto
    delete updateAttachmentDto.orderCode

    if (!orderCode) {
      return await prisma.attachment.update({
        where: { id: id },
        data: updateAttachmentDto,
      })
    }

    const order = await prisma.order.findFirst({
      where: { code: orderCode, softDeleted: false },
    })
    if (!order) throw new NotFoundException('ordem não encontrada')

    const data: Prisma.AttachmentUpdateInput = {
      ...UpdateAttachmentDto,
      order: {
        update: {
          code: orderCode,
        },
      },
    }
    return await prisma.attachment.update({
      where: { id: id, softDeleted: false },
      data,
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
