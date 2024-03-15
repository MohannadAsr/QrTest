import { useAuth } from '@src/Auth/useAuth';
import { useToast } from '@src/hooks/useToast';
import { themeConfig } from '@src/themeConfig';
import type { AxiosError } from 'axios';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const { toast } = useToast();
const { LogOut } = useAuth();

// Error Handler
const errorHandler = async (error: AxiosError) => {
  const config: AxiosRequestConfig | undefined = error?.config;

  if (error.response?.status === 400) {
    toast('invalid data submitted !', 'error');
  }
  if (error.response?.status === 408) {
    toast('Request timed out. Please try again.', 'error');
  }
  if (error.response.status == 401) {
    LogOut();
  }

  return Promise.reject(error);
};

const requestHandler = async (request: AxiosRequestConfig) => {
  const { GetAccessToken } = useAuth();
  // Add Access Token to Request Header
  if (request.headers && GetAccessToken()) {
    request.headers.Authorization = `Bearer ${GetAccessToken()}`;
  }

  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const axiosInstance = axios.create({
  baseURL: `${themeConfig.API_URL}`,
  //   headers: { lang: 'ar' },
});

axiosInstance.interceptors.request.use(requestHandler as any);
axiosInstance.interceptors.response.use(responseHandler, errorHandler);

export { axiosInstance };
