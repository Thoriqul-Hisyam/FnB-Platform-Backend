import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class MenuCategoryController {
  constructor(private readonly categoryService: MenuCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurantId')
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.categoryService.findAll(restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { name: string; restaurantId: string }) {
    return this.categoryService.create(body.name, body.restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.update(id, body.name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
