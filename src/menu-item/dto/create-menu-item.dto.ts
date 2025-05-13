import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMenuItemDto {
  name: string;
  price: number;
  description?: string;
  categoryId?: string;
  imageUrl?: string;
}
