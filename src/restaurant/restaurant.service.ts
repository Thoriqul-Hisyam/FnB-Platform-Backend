import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getRestaurants() {
    try {
      return await this.prisma.restaurant.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Gagal mengambil data restoran');
    }
  }

  async createRestaurant(name: string, address: string) {
    try {
      return await this.prisma.restaurant.create({
        data: { name, address },
      });
    } catch (error) {
      throw new InternalServerErrorException('Gagal membuat restoran');
    }
  }

  async updateRestaurant(id: string, name: string, address: string) {
    try {
      return await this.prisma.restaurant.update({
        where: { id },
        data: { name, address },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Restoran dengan ID ${id} tidak ditemukan`);
      }
      throw new InternalServerErrorException('Gagal memperbarui restoran');
    }
  }

  async deleteRestaurant(id: string) {
    try {
      return await this.prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Restoran dengan ID ${id} tidak ditemukan`);
      }
      throw new InternalServerErrorException('Gagal menghapus restoran');
    }
  }
}
