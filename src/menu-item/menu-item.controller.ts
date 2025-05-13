import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly itemService: MenuItemService) {}

  @Get(':restaurantId')
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.itemService.findAll(restaurantId);
  }

  //   @Delete(':id')
  //   delete(@Param('id') id: string) {
  //     return this.itemService.delete(id);
  //   }

  //   @Post()
  //   create(
  //     @Body()
  //     body: {
  //       name: string;
  //       price: number;
  //       description?: string;
  //       restaurantId: string;
  //       categoryId?: string;
  //       imageUrl?: string;
  //     },
  //   ) {
  //     return this.itemService.create(body);
  //   }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() body: any) {
  //     return this.itemService.update(id, body);
  //   }
  @Get(':id/menus')
  getMenus(@Param('id') restaurantId: string) {
    return this.itemService.getMenusByRestaurant(restaurantId);
  }

  @Post(':id/menus')
  async createMenu(
    @Param('id') restaurantId: string,
    @Body() dto: CreateMenuItemDto,
  ) {
    return await this.itemService.createMenuItem(restaurantId, dto);
  }

  @Put(':restaurantId/menus/:menuId')
  updateMenu(
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
    @Body() dto: CreateMenuItemDto,
  ) {
    return this.itemService.updateMenu(restaurantId, menuId, dto);
  }

  @Delete(':restaurantId/menus/:menuId')
  deleteMenu(
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
  ) {
    return this.itemService.deleteMenu(menuId);
  }
}
