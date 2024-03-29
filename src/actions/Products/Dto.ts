import { boolean } from 'yup';

export class ProductDto {
  id: string = '';
  name: string = '';
  price: number = 0;
  active: boolean = true;
  description: string = '';
  restaurant: string = '';
  createdAt: string = '';
  updatedAt: string = '';
}

export class AddProductDto {
  name: string = '';
  price: number = 0;
  active: boolean = true;
  description: string = '';
  restaurant: string = '';
}
