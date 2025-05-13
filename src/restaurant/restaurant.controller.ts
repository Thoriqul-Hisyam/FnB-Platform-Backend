import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.restaurantService.getRestaurants();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() body: { name: string; address: string }) {
    return this.restaurantService.createRestaurant(body.name, body.address);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string; address: string },
  ) {
    return this.restaurantService.updateRestaurant(id, body.name, body.address);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }
}
