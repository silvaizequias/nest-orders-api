import { HttpException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const findOrders = async () => {
  const prisma = new PrismaService()

  try {
    return await prisma.order.findMany({
      take: 100,
      //cursor: { id: '10' },
      where: { softDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        attachments: true,
      },
    })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrderById = async (id?: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findFirst({
        where: { id: id, softDeleted: false },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nenhum pedido foi encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrderByCode = async (code: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findFirst({
        where: { code: code, softDeleted: false },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nenhum pedido foi encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrdersByCustomer = async (customer: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findMany({
        take: 100,
        //skip: 50,
        where: { customer: customer, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nenhum pedido foi encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrdersByMember = async (member: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findMany({
        take: 100,
        //skip: 50,
        where: { member: member, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nenhum pedido foi encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}

export const findOrdersByOrganization = async (organization: string) => {
  const prisma = new PrismaService()

  try {
    return await prisma.order
      .findMany({
        take: 100,
        //skip: 50,
        where: { organization: organization, softDeleted: false },
        orderBy: { createdAt: 'desc' },
        include: {
          notes: true,
          items: true,
          attachments: true,
        },
      })
      .then(async (res) => {
        if (!res) throw new NotFoundException('nenhum pedido foi encontrado')
        return res
      })
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
