import axios, { AxiosError } from 'axios';
import { themeConfig } from '@src/themeConfig';

export const useVipAuth = () => {
  const Login = async (payload: { email: string; phone: string }) => {
    try {
      const response = await axios.post(
        `${themeConfig.API_URL}/api/vips/login`,
        payload
      );
      SetuserData(response.data.data as any);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const LogOut = () => {
    sessionStorage.removeItem('vip-auth');
    location.reload();
  };

  const SetuserData = (userData: any) => {
    sessionStorage.setItem('vip-auth', JSON.stringify(userData));
  };

  const GetUserData = (): any | undefined => {
    const userData = sessionStorage.getItem('vip-auth');
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
    const userData = sessionStorage.getItem('vip-auth');
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
