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
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly itemService: MenuItemService) {}

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get(':id/menus')
  getMenus(@Param('id') restaurantId: string) {
    return this.itemService.getMenusByRestaurant(restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/menus')
  async createMenu(
    @Param('id') restaurantId: string,
    @Body() dto: CreateMenuItemDto,
  ) {
    return await this.itemService.createMenuItem(restaurantId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':restaurantId/menus/:menuId')
  updateMenu(
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
    @Body() dto: CreateMenuItemDto,
  ) {
    return this.itemService.updateMenu(restaurantId, menuId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':restaurantId/menus/:menuId')
  deleteMenu(
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
  ) {
    return this.itemService.deleteMenu(menuId);
  }
}
