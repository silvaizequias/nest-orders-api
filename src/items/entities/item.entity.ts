import { Item } from '@prisma/client'

export class ItemEntity implements Item {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  code: string
  note: string
  amount: number
  file: string
}
