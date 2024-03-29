import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VIPS_API } from './EndPoints';
import { AddVIPDto, PaginationControlDTO, VIPDTO, paginationDTO } from './Dto';

const { GET, DELETE, POST } = useApi();

const getVips = async (paginationControl: PaginationControlDTO) => {
  const response = await GET<{
    data: VIPDTO[];
    allVipRequests: VIPDTO[];
    pagination: paginationDTO;
  }>(VIPS_API.main, paginationControl);
  return response.data;
};

const addVip = async (payload: AddVIPDto) => {
  const response = await POST(VIPS_API.main, payload);
  return response.data;
};
const RequestVipMember = async (payload: AddVIPDto) => {
  const response = await POST(VIPS_API.Request, payload);
  return response.data;
};
const AcceptVipMember = async (id: string) => {
  const response = await POST(VIPS_API.Accept + id);
  return response.data;
};
const RejectVipMember = async (id: string) => {
  const response = await POST(VIPS_API.Reject + id);
  return response.data;
};

const deleteVips = async (ids: string[]) => {
  const response = await DELETE(VIPS_API.main, ids);
  return response.data;
};

export const useVipQuery = (paginationControl: PaginationControlDTO) => {
  return useQuery({
    queryKey: ['VIPS'],
    queryFn: () => getVips(paginationControl),
    refetchOnMount: false,
    enabled: true,
    refetchOnWindowFocus: false,
    // placeholderData: { data: [], pagination: new paginationDTO() },
  });
};

export const MutataAddVip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addVip'],
    mutationFn: (payload: AddVIPDto) => addVip(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['VIPS'] });
    },
  });
};

export const MutateDeleteVip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteVip'],
    mutationFn: deleteVips,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['VIPS'] });
      }
    },
  });
};

export const MutateVipRequest = () => {
  return useMutation({
    mutationKey: ['RequestVip'],
    mutationFn: (payload: AddVIPDto) => RequestVipMember(payload),
  });
};
export const MutateAcceptVipRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['AcceptVip'],
    mutationFn: (payload: string) => AcceptVipMember(payload),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['VIPS'] });
      }
    },
  });
};

export const MutateRejectVipRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['RejectVip'],
    mutationFn: (payload: string) => RejectVipMember(payload),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['VIPS'] });
      }
    },
  });
};
