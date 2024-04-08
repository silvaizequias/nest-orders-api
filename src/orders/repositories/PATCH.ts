import {
  orderCompletedEmailTemplate,
  orderCompletedSmsTemplate,
} from 'src/utils/send-messages/templates/index'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  orderSmsTemplateCreated,
  orderStatedEmailTemplate,
} from 'src/utils/send-messages/templates'
import {
  OrganizationType,
  UserType,
} from 'src/utils/handle-management-api/types'
import {
  getOrganizationByDocument,
  getUserByDocument,
  getUserByPhone,
} from 'src/utils/handle-management-api'
import { sendEmail, sendSms } from 'src/utils/send-messages'

export const updateOrder = async (
  id: string,
  updateOrderDto: UpdateOrderDto,
) => {
  const prisma = new PrismaService()

  try {
    const { started, completed } = updateOrderDto

    const orderData = await prisma.order.findFirst({
      where: { id: id },
    })
    if (!orderData) throw new NotFoundException('o pedido não foi encontrado')

    const organizationData: OrganizationType = await getOrganizationByDocument(
      orderData?.organization,
    )

    const customerData: UserType = await getUserByDocument(orderData?.customer)

    const memberData: UserType = await getUserByPhone(orderData?.member)

    const data: Prisma.OrderUpdateInput = {
      ...updateOrderDto,
    }

    return await prisma.order
      .update({
        where: { id: id, softDeleted: false },
        data,
      })
      .then(async (res) => {
        if (started) {
          const orderStartedSmsMessage = orderSmsTemplateCreated({
            order: orderData?.code,
            organization: organizationData?.name,
            requirement: orderData?.requirement,
          })
          const orderStartedEmailMessage = orderStatedEmailTemplate({
            order: orderData?.code,
            member: memberData?.name,
            organization: organizationData?.name,
            requirement: orderData?.requirement,
          })
          await sendEmail({
            bbc: organizationData?.email,
            body: orderStartedEmailMessage,
            subject: `${orderData?.code} :: pedido iniciado`,
            to: customerData?.email,
          })
          await sendSms({
            content: orderStartedSmsMessage,
            to: customerData?.phone,
          })
        }

        if (completed) {
          const orderCompletedSmsMessage = orderCompletedSmsTemplate({
            order: orderData?.code,
            member: memberData?.name,
            organization: organizationData?.name,
            requirement: orderData?.requirement,
          })
          const orderCompletedEmailMessage = orderCompletedEmailTemplate({
            order: orderData?.code,
            member: memberData?.name,
            organization: organizationData?.name,
            requirement: orderData?.requirement,
          })
          await sendEmail({
            bbc: organizationData?.email,
            body: orderCompletedEmailMessage,
            subject: `${orderData?.code} :: pedido concluído`,
            to: customerData?.email,
          })
          await sendSms({
            content: orderCompletedSmsMessage,
            to: customerData?.phone,
          })
        }

        return JSON.stringify(`o pedido ${res?.code} foi atualizada`)
      })
      .catch((error: any) => console.log(error))
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
