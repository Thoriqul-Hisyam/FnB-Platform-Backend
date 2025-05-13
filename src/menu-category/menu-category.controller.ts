import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';

@Controller('categories')
export class MenuCategoryController {
  constructor(private readonly categoryService: MenuCategoryService) {}

  @Get(':restaurantId')
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.categoryService.findAll(restaurantId);
  }

  @Post()
  create(@Body() body: { name: string; restaurantId: string }) {
    return this.categoryService.create(body.name, body.restaurantId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.update(id, body.name);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
