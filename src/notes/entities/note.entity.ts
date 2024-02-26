import { Note } from '@prisma/client'

export class NoteEntity implements Note {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  content: string
  member: string
  customer: string
}
