import { Attachment } from '@prisma/client'

export class AttachmentEntity implements Attachment {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  code: string
  note: string
  file: string
}
