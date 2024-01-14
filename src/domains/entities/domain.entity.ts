import { Domain } from '@prisma/client'

export class DomainEntity implements Domain {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  organization: string
  authorization: string
}
