import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(restaurantId: string) {
    return await this.prisma.menuCategory.findMany({
      where: { restaurantId },
    });
  }

  async create(name: string, restaurantId: string) {
    try {
      return await this.prisma.menuCategory.create({
        data: { name, restaurantId },
      });
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, name: string) {
    try {
      return await this.prisma.menuCategory.update({
        where: { id },
        data: { name },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.menuCategory.delete({ where: { id } });
    } catch (err) {
      throw err;
    }
  }
}
