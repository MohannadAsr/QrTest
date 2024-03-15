export class VIPDTO {
  id: string = '';
  name: string = '';
  email: string | null = null;
  phone: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
}

export class paginationDTO {
  page = 1 as number;
  pageSize = 10 as number;
  offset = 0 as number;
  totalPages = 1 as number;
  totalCount = 1 as number;
}

export class PaginationControlDTO {
  pageIndex = 1 as number;
  pageSize = 10 as number;
}

export class AddVIPDto {
  name: string = '';
  email: string | null = '';
  phone: string | null = '';
}
