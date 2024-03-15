import { useState, useMemo } from 'react';

export class DashPagination {
  totalCount = 1 as number;
  pageIndex = 1 as number;
  limit = 10 as number;
  get totalPages() {
    return Math.ceil(this.totalCount / this.limit);
  }
}

export const usePagination = (
  initialTotalCount: number = 1,
  limit: number = 4
) => {
  const [pagination, setPagination] = useState<DashPagination>({
    totalCount: initialTotalCount,
    pageIndex: 1,
    limit: limit,
    get totalPages() {
      return Math.ceil(this.totalCount / this.limit);
    },
  });

  const paginate = <T>(array: T[]): T[] => {
    return array.slice(
      (pagination.pageIndex - 1) * pagination.limit,
      pagination.pageIndex * pagination.limit
    );
  };

  return {
    pagination,
    setPagination,
    paginate,
  };
};
