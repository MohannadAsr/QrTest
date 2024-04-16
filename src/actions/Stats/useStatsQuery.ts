import { useApi } from '@src/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import { STATS_API } from './Dto';

const { GET, DELETE, POST } = useApi();

export type monthsStats = {
  month: string;
  count: number;
};

const getStats = async (query: { currentYear: string }) => {
  const response = await GET<{
    year: string;
    events: monthsStats[];
    invitations: monthsStats[];
    vips: monthsStats[];
  }>(STATS_API.main, query);
  return response.data;
};

export const useStatsQuery = (query: { currentYear: string }) => {
  return useQuery({
    queryKey: ['Stats'],
    queryFn: () => getStats(query),
    enabled: false,
  });
};
