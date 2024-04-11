import { InvitationDetails } from '../Invitaions/Dto';

export class BillDto {
  id: string = '';
  date: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  invitation: InvitationDetails = new InvitationDetails();
  billDetails: { amount_total: number } = { amount_total: 0 };
}
