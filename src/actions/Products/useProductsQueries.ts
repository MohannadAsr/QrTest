import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_API } from './EndPoints';
import { PaginationControlDTO, paginationDTO } from '../Vips/Dto';
import { AddProductDto, ProductDto } from './Dto';

const { GET, DELETE, POST } = useApi();

const getProducts = async (paginationControl: PaginationControlDTO) => {
  const response = await GET<{ data: ProductDto[]; pagination: paginationDTO }>(
    PRODUCTS_API.main,
    paginationControl
  );
  return response.data;
};
const getProductsList = async () => {
  const response = await GET<{ data: ProductDto[] }>(PRODUCTS_API.productList);
  return response.data.data;
};

const addProduct = async (payload: AddProductDto) => {
  const response = await POST(PRODUCTS_API.main, payload);
  return response.data;
};
const switchProduct = async (id: string) => {
  const response = await POST(PRODUCTS_API.switch + id);
  return response.data;
};

const deleteProducts = async (ids: string[]) => {
  const response = await DELETE(PRODUCTS_API.main, ids);
  return response.data;
};

export const useProductsQuery = (paginationControl: PaginationControlDTO) => {
  return useQuery({
    queryKey: ['Products'],
    queryFn: () => getProducts(paginationControl),
    refetchOnMount: false,
    enabled: true,
    refetchOnWindowFocus: false,
  });
};
export const useProductsListQuery = () => {
  return useQuery({
    queryKey: ['ProductsList'],
    queryFn: () => getProductsList(),
    refetchOnMount: false,
    enabled: true,
    refetchOnWindowFocus: false,
  });
};

export const MutateAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['AddProduct'],
    mutationFn: (payload: AddProductDto) => addProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Products'] });
    },
  });
};

export const MutateDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteProducts'],
    mutationFn: deleteProducts,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['Products'] });
      }
    },
  });
};

export const MutateSwitchStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['SwitchProductStatus'],
    mutationFn: (id: string) => switchProduct(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['Products'] });
      }
    },
  });
};
