import { InvitationStatus } from '@src/enums/Enums';
import { EventDTO, InvitationByUserId } from '../Events/Dto';
import { VIPDTO } from '../Vips/Dto';
import { ProductDto } from '../Products/Dto';

export class UpdateInvitaionStatusDTO {
  id: string = '';
  status: InvitationStatus[number] = InvitationStatus.Pending;
}

export class CreateVipInvitaion {
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
  peopleNames: string[] = [''];
}

export class InvitationDetails {
  invitation: CreateVipInvitaion &
    InvitationByUserId & {
      products: {
        id: string;
        quantity: number;
        product: ProductDto;
      }[];
    } = {
    ...new CreateVipInvitaion(),
    ...new InvitationByUserId(),
    products: [],
  };
  event: EventDTO = new EventDTO();
  vip: VIPDTO;
}
