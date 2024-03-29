import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateVipInvitaion,
  InvitationDetails,
  UpdateInvitaionStatusDTO,
} from './Dto';
import { Invitations_API } from './EndPoints';
import { InvitaionByEventDto, InvitationByUserId } from '../Events/Dto';

const { POST, GET } = useApi();

const UpdateInvitaionStatus = async (payload: UpdateInvitaionStatusDTO) => {
  const response = await POST(Invitations_API.UpdateInvitaionStatus, payload);
  return response;
};
const CreateInvitation = async (payload: CreateVipInvitaion) => {
  const response = await POST(Invitations_API.main, payload);
  return response;
};
const UpdateStatus = async (payload: { id: string; status: string }) => {
  const response = await POST(Invitations_API.UPDATEStatus, payload);
  return response.data;
};
const approveInvitation = async (payload: { id: string }) => {
  const response = await POST(Invitations_API.ApproveInvitation, payload);
  return response.data;
};
const RejectInvitation = async (payload: { id: string }) => {
  const response = await POST(Invitations_API.RejectInvitation, payload);
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

export const MutateUpdateInvitaionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: (payload: UpdateInvitaionStatusDTO) =>
      UpdateInvitaionStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionsById'] });
    },
  });
};

export const MutateApproveInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['approveInvitation'],
    mutationFn: (payload: { id: string }) => approveInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionsById'] });
    },
  });
};
export const MutateRejectInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['RejectInvitation'],
    mutationFn: (payload: { id: string }) => RejectInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionsById'] });
    },
  });
};

export const MutateCreateInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: (payload: CreateVipInvitaion) => CreateInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionVip'] });
    },
  });
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
