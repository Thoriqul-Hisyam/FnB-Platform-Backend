import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    restaurantId: string,
    orderItems: { menuItemId: string; quantity: number }[],
    customerInfo?: { name?: string; phone?: string },
  ) {
    try {
      const totalPrice = await this.calculateTotalPrice(orderItems);

      let customerId: string | undefined;

      if (customerInfo?.phone) {
        const existingCustomer = await this.prisma.customer.findUnique({
          where: { phone: customerInfo.phone },
        });

        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          const newCustomer = await this.prisma.customer.create({
            data: {
              name: customerInfo.name,
              phone: customerInfo.phone,
            },
          });
          customerId = newCustomer.id;
        }
      }

      const order = await this.prisma.order.create({
        data: {
          restaurantId,
          orderItems: {
            create: orderItems.map((item) => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: item.quantity,
            })),
          },
          totalPrice,
          customerId,
        },
      });
      return order;
    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
  }

  private async calculateTotalPrice(
    orderItems: { menuItemId: string; quantity: number }[],
  ) {
    let total = 0;
    for (const item of orderItems) {
      const menuItem = await this.prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      });
      if (!menuItem || typeof menuItem.price !== 'number') {
        throw new Error(
          `Menu item not found or invalid price for ID: ${item.menuItemId}`,
        );
      }
      total += menuItem.price * item.quantity;
    }
    return total;
  }

  async getOrder(id: string) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return await this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async deleteOrder(id: string) {
    try {
      await this.prisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete order: ' + error.message);
    }
  }

  //   async getOrdersByCustomer(phone: string) {
  //     return this.prisma.order.findMany({
  //       where: { customerPhone: phone },
  //       include: { orderItems: true, restaurant: true },
  //       orderBy: { createdAt: 'desc' },
  //     });
  //   }

  async getOrderHistoryById(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        orders: {
          include: {
            orderItems: { include: { menuItem: true } },
            restaurant: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!customer) throw new Error('Customer not found');

    return customer.orders;
  }
}
