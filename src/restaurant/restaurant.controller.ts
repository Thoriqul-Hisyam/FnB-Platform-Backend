import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getAll() {
    return this.restaurantService.getRestaurants();
  }

  @Post('create')
  create(@Body() body: { name: string; address: string }) {
    return this.restaurantService.createRestaurant(body.name, body.address);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string; address: string },
  ) {
    return this.restaurantService.updateRestaurant(id, body.name, body.address);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }
}
