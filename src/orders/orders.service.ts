import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { createOrder } from './repositories/POST'
import {
  findOrderByCode,
  findOrderById,
  findOrders,
  findOrdersByCustomer,
  findOrdersByMember,
  findOrdersByOrganization,
} from './repositories/GET'
import { updateOrder } from './repositories/PATCH'
import { removeOrder } from './repositories/DELETE'

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return createOrder(createOrderDto)
  }

  findAll() {
    return findOrders()
  }

  findByCode(code: string) {
    return findOrderByCode(code)
  }

  findByCustomer(customer: string) {
    return findOrdersByCustomer(customer)
  }

  findByMember(member: string) {
    return findOrdersByMember(member)
  }

  findByOrganization(organization: string) {
    return findOrdersByOrganization(organization)
  }

  findOne(id: string) {
    return findOrderById(id)
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return updateOrder(id, updateOrderDto)
  }

  remove(id: string) {
    return removeOrder(id)
  }
}
