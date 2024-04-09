import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationApiKeyGuard } from 'src/authorization/authorization.guard'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  //@UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.ordersService.findByCode(code)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer/:customer')
  findByCustomer(@Param('customer') customer: string) {
    return this.ordersService.findByCustomer(customer)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('member/:member')
  findByMember(@Param('member') member: string) {
    return this.ordersService.findByMember(member)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('organization/:organization')
  findByOrganization(@Param('organization') organization: string) {
    return this.ordersService.findByOrganization(organization)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto)
  }

  @UseGuards(AuthorizationApiKeyGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id)
  }
}
