import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from '@prisma/client';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body()
    createOrderDto: {
      restaurantId: string;
      orderItems: { menuItemId: string; quantity: number }[];
      customerInfo?: { name?: string; phone?: string };
    },
  ) {
    return await this.orderService.createOrder(
      createOrderDto.restaurantId,
      createOrderDto.orderItems,
      createOrderDto.customerInfo,
    );
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrder(id);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    const statusEnum = dto.status.toUpperCase() as OrderStatus;

    if (!Object.values(OrderStatus).includes(statusEnum)) {
      throw new Error('Invalid status value');
    }

    return await this.orderService.updateOrderStatus(id, statusEnum);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }

  //   @Get('/customer/:phone')
  //   getOrdersByCustomer(@Param('phone') phone: string) {
  //     return this.orderService.getOrdersByCustomer(phone);
  //   }

  @Get('/history/:customerId')
  getOrderHistory(@Param('customerId') customerId: string) {
    return this.orderService.getOrderHistoryById(customerId);
  }
}
