import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { HttpException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AddressByZipCodeType } from 'src/utils/handle-address/types'
import { getAddressByZipCode } from 'src/utils/handle-address'
import {
  getOrganizationByDocument,
  getUserByDocument,
  getUserByPhone,
} from 'src/utils/handle-management-api'
import {
  OrganizationType,
  UserType,
} from 'src/utils/handle-management-api/types'
import {
  orderEmailTemplateCreated,
  orderSmsTemplateCreated,
} from 'src/utils/send-messages/templates'
import { sendEmail, sendSms } from 'src/utils/send-messages'

export const createOrder = async (createOrderDto: CreateOrderDto) => {
  const prisma = new PrismaService()
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const {
      code,
      customer,
      destinationZipCode,
      member,
      organization,
      originZipCode,
      requirement,
    } = createOrderDto

    const orderCode = code || randomCode

    const organizationData: OrganizationType =
      await getOrganizationByDocument(organization)

    if (!organizationData)
      throw new NotFoundException('a organização não existe na plataforma')

    const organizationAddress: AddressByZipCodeType = await getAddressByZipCode(
      originZipCode || organizationData?.zipCode,
    )

    const customerData: UserType = await getUserByDocument(customer)

    const customerAddress: AddressByZipCodeType = await getAddressByZipCode(
      destinationZipCode || customerData?.zipCode,
    )

    const memberData: UserType = await getUserByPhone(member)

    const data: Prisma.OrderCreateInput = {
      ...createOrderDto,
      code: orderCode,
      originZipCode: originZipCode || organizationData?.zipCode,
      originComplement: organizationData?.complement || null,
      originLatitude:
        organizationData?.latitude || Number(organizationAddress?.lat) || null,
      originLongitude:
        organizationData?.longitude || Number(organizationAddress?.lng) || null,
      destinationZipCode: destinationZipCode || customerData?.zipCode,
      destinationComplement:
        customerData?.complement || customerAddress?.address || null,
      destinationLatitude:
        customerData?.latitude || Number(customerAddress?.lat) || null,
      destinationLongitude:
        customerData?.longitude || Number(customerAddress?.lng) || null,
    }

    await prisma.order
      .create({ data })
      .then(async () => {
        const emailMessage = orderEmailTemplateCreated({
          order: orderCode,
          organization: organizationData?.name,
          requirement: requirement,
        })
        await sendEmail({
          bbc: customerData?.email,
          body: emailMessage,
          subject: `${orderCode} :: um novo pedido foi criado na plataforma dedicado`,
          to: organizationData?.email,
        })
        const smsMessage = orderSmsTemplateCreated({
          order: orderCode,
          organization: organizationData?.name,
          requirement: requirement,
        })
        await sendSms({
          content: smsMessage,
          to: customerData?.phone || organizationData?.phone,
        })

        member &&
          (await sendSms({
            content: smsMessage,
            to: memberData?.phone,
          }))
      })
      .catch((error: any) => console.log(error))

    return JSON.stringify(`o pedido ${randomCode} foi criado`)
  } catch (error) {
    await prisma.$disconnect()
    throw new HttpException(error, error.status)
  } finally {
    await prisma.$disconnect()
  }
}
