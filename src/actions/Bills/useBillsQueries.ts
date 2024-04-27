import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BILLS_API } from './EndPoints';
import { PaginationControlDTO, paginationDTO } from '../Vips/Dto';
import { BillDto } from './Dto';

const { GET, DELETE, POST } = useApi();

// Get All Bills

const getBills = async (paginationControl: PaginationControlDTO) => {
  const response = await GET<{
    pagination: paginationDTO;
    data: BillDto[];
  }>(BILLS_API.main, paginationControl);
  return response.data;
};

export const useBillsQuery = (paginationControl: PaginationControlDTO) => {
  return useQuery({
    queryKey: ['Bills'],
    queryFn: () => getBills(paginationControl),
    refetchOnMount: false,
    enabled: true,
    refetchOnWindowFocus: false,
    // placeholderData: { data: [], pagination: new paginationDTO() },
  });
};

// Delete Bills

const deleteBills = async (ids: string[]) => {
  const response = await DELETE(BILLS_API.main, ids);
  return response.data;
};

export const MutateDeleteBills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteVip'],
    mutationFn: deleteBills,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['Bills'] });
      }
    },
  });
};
