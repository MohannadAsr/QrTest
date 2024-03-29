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
  id: string = '';
  event: EventDTO = new EventDTO();
  vip: VIPDTO = new VIPDTO();
  qrCodeId: string | null = null;
  status: InvitationStatus = InvitationStatus.Pending;
  optionsId: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
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
  completedDate: string | Date | null = null;
}

export class HomeInfo {
  nextEvent: EventDTO = new EventDTO();
  totalVips: number = 0;
  totalEvents: number = 0;
  totalInvitaions: number = 0;
  totalProducts: number = 0;
}
