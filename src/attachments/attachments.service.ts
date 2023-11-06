import { Injectable } from '@nestjs/common'
import { CreateAttachmentDto } from './dto/create-attachment.dto'
import { UpdateAttachmentDto } from './dto/update-attachment.dto'
import { createAttachmentRespository } from './repositories/create-attachment.repository'
import { readAttachmentRepository } from './repositories/read-attachment.repository'
import { updateAttachmentRepository } from './repositories/update-attachment.repository'
import { deleteAttachmentRepository } from './repositories/delete-attachment.repository'

@Injectable()
export class AttachmentsService {
  create(createAttachmentDto: CreateAttachmentDto) {
    return createAttachmentRespository(createAttachmentDto)
  }

  findAll() {
    return readAttachmentRepository()
  }

  findOne(id: string) {
    return readAttachmentRepository(id)
  }

  update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    return updateAttachmentRepository(id, updateAttachmentDto)
  }

  remove(id: string) {
    return deleteAttachmentRepository(id)
  }
}
