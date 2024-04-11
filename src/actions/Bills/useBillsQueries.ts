import { useApi } from '@src/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
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
