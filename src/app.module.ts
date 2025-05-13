import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PrismaModule,
    RestaurantModule,
    MenuCategoryModule,
    MenuItemModule,
    OrderModule,
  ],
})
export class AppModule {}
