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

export class AddTabelDto {
  number: string = '';
  seats: number = 1;
}

export class TableDto {
  id: string = '';
  number: number = 0;
  seats: number = 0;
  createdAt: string = '';
  updatedAt: string = '';
}
