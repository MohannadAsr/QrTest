import axios, { AxiosError } from 'axios';
import { useToast } from '../hooks/useToast';
import { themeConfig } from '@src/themeConfig';

const { toast } = useToast();
export const useAuth = () => {
  const Login = async (payload: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${themeConfig.API_URL}/users/login`,
        payload
      );
      SetuserData(response.data.data as any);
      return response.data;
    } catch (error) {
      toast(error?.response?.data.message, 'error');
      throw error;
    }
  };

  const LogOut = () => {
    localStorage.removeItem(themeConfig.localStorageName);
    window.location.assign('/signin');
  };

  const SetuserData = (userData: any) => {
    localStorage.setItem(
      themeConfig.localStorageName,
      JSON.stringify(userData)
    );
  };

  const GetUserData = (): any | undefined => {
    const userData = localStorage.getItem(themeConfig.localStorageName);
    return userData ? JSON.parse(userData) : JSON.stringify(undefined);
  };

  const isAuth = (SuccessFn: () => void, FailFn?: () => void) => {
    isLoggedIn() ? SuccessFn() : FailFn ? FailFn() : null;
  };

  const GetAccessToken = (): string | undefined => {
    const userData = GetUserData();
    return userData ? userData.token : null;
  };

  const isLoggedIn = (): boolean => {
    const userData = localStorage.getItem(themeConfig.localStorageName);
    return userData ? true : false;
  };

  return {
    Login,
    LogOut,
    GetUserData,
    isLoggedIn,
    GetAccessToken,
    SetuserData,
    isAuth,
  };
};
