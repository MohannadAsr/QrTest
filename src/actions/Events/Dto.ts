import { InvitationStatus } from '@src/enums/Enums';
import { VIPDTO } from '../Vips/Dto';

export class CreateEventDTO {
  name = '' as string;
  description = '' as string;
  date = null as Date | null;
  image = null as File | null;
  tablesCount: number = 5;
}

export class EventDTO {
  id: string = '';
  name: string = '';
  description: string = '';
  date: string = '';
  imageId: string | null = null;
  image: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
  tablesCount: number = 5;
}

export class InvitaionByEventDto {
  peopleNames: string[] | null = null;
  products: Product[] = [];
  id: string = '';
  eventId: string = '';
  vipId: string = '';
  qrCodeId: string = '';
  qrCodeUrl: string = '';
  status: string = '';
  peopleCount: number = 0;
  paid: boolean = false;
  paymentUrl: string = '';
  paymentId: string | null = null;
  tableReservation: boolean = false;
  deliveryOption: boolean = false;
  deliveryDate: string | null = null;
  deliveryAddress: string | null = null;
  completedDate: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
  vip: Vip = new Vip();
}

export class Product {
  id: string = '';
  quantity: number = 0;
  name: string = '';
  price: number = 0;
}

export class Vip {
  name: string = '';
  email: string = '';
  phone: string = '';
  id: string = '';
}

export class InvitationByUserId {
  id: string = '';
  eventId: string = '';
  vipId: string = '';
  qrCodeId: string = '';
  qrCodeUrl: string = '';
  status: InvitationStatus = InvitationStatus.Pending;
  optionsId: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
  paymentUrl: string = '';
  completedDate: string | Date | null = null;
}

export class HomeInfo {
  nextEvent: EventDTO = new EventDTO();
  totalVips: number = 0;
  totalEvents: number = 0;
  totalInvitaions: number = 0;
  totalProducts: number = 0;
}
