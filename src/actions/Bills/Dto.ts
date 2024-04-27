import { InvitationDetails } from '../Invitaions/Dto';

export class BillDto {
  id: string = '';
  date: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  invitation: InvitationDetails = new InvitationDetails();
  amount: number = 0;
}
