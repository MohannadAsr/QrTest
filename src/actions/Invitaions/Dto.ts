import { InvitationStatus } from '@src/enums/Enums';
import { EventDTO, InvitationByUserId } from '../Events/Dto';
import { VIPDTO } from '../Vips/Dto';
import { ProductDto } from '../Products/Dto';

export class UpdateInvitaionStatusDTO {
  id: string = '';
  status: InvitationStatus[number] = InvitationStatus.Pending;
}

export class InvitationDetails {
  invitation: CreateVipInvitaionDto &
    InvitationByUserId & {
      products: {
        id: string;
        quantity: number;
        product: ProductDto;
      }[];
    } = {
    ...new CreateVipInvitaionDto(),
    ...new InvitationByUserId(),
    products: [],
  };
  event: EventDTO = new EventDTO();
  vip: VIPDTO;
}

export class CreateVipInvitaionForm {
  eventId: string = '';
  vipId: string = '';
  peopleCount: number = 1;
  tableReservation: boolean = false;
  tableId: string | null = null;
  deliveryOption: boolean = false;
  deliveryDate: string | Date = new Date();
  deliveryAddress: string = '';
  productsOption: boolean = false;
  products: { id: string; quantity: number; name: string }[] = [];
  peopleNames: string[] = [];
  multiple: boolean = false;
  comment: string = '';
}

export class CreateVipInvitaionDto {
  eventId: string = '';
  vipId: string = '';
  peopleCount: number = 1;
  tableReservation: boolean = false;
  tableId: string | null = null;
  deliveryOption: boolean = false;
  deliveryDate: string | Date = new Date();
  deliveryAddress: string = '';
  productsOption: boolean = false;
  products: { id: string; quantity: number; name: string; price: number }[] =
    [];
  peopleNames: string[] = [];
  comment: string = '';
}

export class UpdateVipInvitation extends CreateVipInvitaionDto {
  id: string = '';
}
