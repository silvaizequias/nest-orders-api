import { Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { createItem } from './repositories/POST'
import { findItemById, findItems } from './repositories/GET'
import { updateItem } from './repositories/PATCH'
import { removeItem } from './repositories/DELETE'

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    return createItem(createItemDto)
  }

  findAll() {
    return findItems()
  }

  findOne(id: string) {
    return findItemById(id)
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return updateItem(id, updateItemDto)
  }

  remove(id: string) {
    return removeItem(id)
  }
}
