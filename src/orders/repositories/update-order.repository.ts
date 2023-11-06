import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export const updateOrderRepository = async (
  id: string,
  updateOrderDto: UpdateOrderDto,
) => {
  const prisma = new PrismaService()

  try {
    const data: Prisma.OrderUpdateInput = {
      ...updateOrderDto,
    }
    return await prisma.order.update({
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
