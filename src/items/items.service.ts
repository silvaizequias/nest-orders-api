import { Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { createItemRepository } from './repositories/create-item.repository'
import { readItemRepository } from './repositories/read-item.repository'
import { updateItemRepository } from './repositories/update-item.repository'
import { deleteItemRepository } from './repositories/delete-item.repository'

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    return createItemRepository(createItemDto)
  }

  findAll() {
    return readItemRepository()
  }

  findOne(id: string) {
    return readItemRepository(id)
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return updateItemRepository(id, updateItemDto)
  }

  remove(id: string) {
    return deleteItemRepository(id)
  }
}
