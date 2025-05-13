import { IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: `Status harus salah satu dari: ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
