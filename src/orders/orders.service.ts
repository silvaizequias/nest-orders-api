import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { createOrderRepository } from './repositories/create-order.repository'
import { readOrderRepository } from './repositories/read-order.repository'
import { updateOrderRepository } from './repositories/update-order.repository'
import { deleteOrderRepository } from './repositories/delete-order.repository'
import { readOrderByCodeRepository } from './repositories/read-order-by-code.repository'

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return createOrderRepository(createOrderDto)
  }

  findAll() {
    return readOrderRepository()
  }

  findByCode(code: string) {
    return readOrderByCodeRepository(code)
  }

  findOne(id: string) {
    return readOrderRepository(id)
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return updateOrderRepository(id, updateOrderDto)
  }

  remove(id: string) {
    return deleteOrderRepository(id)
  }
}
