import { InvitationStatus } from '@src/enums/Enums';

export class UpdateInvitaionStatusDTO {
  id: string = '';
  status: InvitationStatus[number] = InvitationStatus.Pending;
}
