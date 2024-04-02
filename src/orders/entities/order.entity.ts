import { Order } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class OrderEntity implements Order {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
  requirement: string
  subject: string
  price: Decimal
  observation: string
  organization: string
  customer: string
  member: string
  originZipCode: string
  originComplement: string
  originLatitude: number
  originLongitude: number
  destinationZipCode: string
  destinationComplement: string
  destinationLatitude: number
  destinationLongitude: number
  latitude: number
  longitude: number
  directions: string
  deadline: Date
  started: boolean
  startDate: Date
  startNote: string
  completed: boolean
  completionDate: Date
  completionNote: string
  canceled: boolean
  cancellationDate: Date
  cancellationNote: string
}
