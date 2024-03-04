import { Injectable } from '@nestjs/common'
import { CreateAttachmentDto } from './dto/create-attachment.dto'
import { UpdateAttachmentDto } from './dto/update-attachment.dto'
import { createAttachment } from './repositories/POST'
import { findAttachmentById, findAttachments } from './repositories/GET'
import { updateAttachment } from './repositories/PATCH'
import { removeAttachment } from './repositories/DELETE'

@Injectable()
export class AttachmentsService {
  create(createAttachmentDto: CreateAttachmentDto) {
    return createAttachment(createAttachmentDto)
  }

  findAll() {
    return findAttachments()
  }

  findOne(id: string) {
    return findAttachmentById(id)
  }

  update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    return updateAttachment(id, updateAttachmentDto)
  }

  remove(id: string) {
    return removeAttachment(id)
  }
}
