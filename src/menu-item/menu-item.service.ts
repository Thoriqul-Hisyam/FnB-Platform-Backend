import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(private prisma: PrismaService) {}

  async findAll(restaurantId: string) {
    return await this.prisma.menuItem.findMany({
      where: { restaurantId },
    });
  }

  //   async create(data: {
  //     name: string;
  //     price: number;
  //     description?: string;
  //     restaurantId: string;
  //     categoryId?: string;
  //     imageUrl?: string;
  //   }) {
  //     try {
  //       return await this.prisma.menuItem.create({ data });
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  //   async update(id: string, data: any) {
  //     try {
  //       return await this.prisma.menuItem.update({
  //         where: { id },
  //         data,
  //       });
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  //   async delete(id: string) {
  //     try {
  //       return await this.prisma.menuItem.delete({ where: { id } });
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  async getMenusByRestaurant(restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: { restaurantId },
      include: { category: true },
    });
  }

  async createMenuItem(restaurantId: string, dto: CreateMenuItemDto) {
    return await this.prisma.menuItem.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        imageUrl: dto.imageUrl,
        restaurantId: restaurantId,
        categoryId: dto.categoryId,
      },
    });
  }
  async updateMenu(
    restaurantId: string,
    menuId: string,
    dto: CreateMenuItemDto,
  ) {
    return this.prisma.menuItem.update({
      where: { id: menuId },
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        restaurantId: restaurantId,
        categoryId: dto.categoryId,
      },
    });
  }

  async deleteMenu(menuId: string) {
    return this.prisma.menuItem.delete({
      where: { id: menuId },
    });
  }
}
