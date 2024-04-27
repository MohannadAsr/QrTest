import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateVipInvitaionDto,
  InvitationDetails,
  UpdateInvitaionStatusDTO,
  UpdateVipInvitation,
} from './Dto';
import { Invitations_API } from './EndPoints';
import { InvitaionByEventDto, InvitationByUserId } from '../Events/Dto';

const { POST, GET, DELETE } = useApi();

const UpdateStatus = async (payload: { id: string; status: string }) => {
  const response = await POST(Invitations_API.UPDATEStatus, payload);
  return response.data;
};

const DeleteInvitation = async (id: string) => {
  const response = await DELETE(Invitations_API.main, {}, { id: id });
  return response.data;
};

const getVipInvitaion = async (payload: { eventId: string; vipId: string }) => {
  const response = await GET<{ data: InvitationByUserId }>(
    Invitations_API.VIPINvitaions,
    payload
  );
  return response.data.data;
};

const getInviteDetails = async (id: string) => {
  const response = await GET<{ data: InvitationDetails }>(
    Invitations_API.InvitaionById + id
  );
  return response.data.data;
};

export const useVipInvitaion = (payload: {
  eventId: string;
  vipId: string;
}) => {
  return useQuery({
    queryKey: ['invitaionVip'],
    queryFn: () => getVipInvitaion(payload),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const MutateGetInviteByID = () => {
  return useMutation({
    mutationKey: ['InviteById'],
    mutationFn: (id: string) => getInviteDetails(id),
  });
};

export const MutateUpdateStatus = () => {
  return useMutation({
    mutationKey: ['UpdateStatus'],
    mutationFn: (payload: { id: string; status: string }) =>
      UpdateStatus(payload),
  });
};

export const MutateDeleteInvite = () => {
  return useMutation({
    mutationKey: ['DeleteInvite'],
    mutationFn: (id: string) => DeleteInvitation(id),
  });
};

// Update Invitation

const updateInvitation = async (payload: UpdateVipInvitation) => {
  const response = await POST(Invitations_API.UPDATE, payload);
  return response.data;
};

export const MutateUpdateInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['UpdateInvite'],
    mutationFn: (payload: UpdateVipInvitation) => updateInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionsById'] });
    },
  });
};
