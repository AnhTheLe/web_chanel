import { AuthResponse } from 'src/types/auth.type';
import Http from 'src/utils/http';

export const URL_LOGIN = 'api/customer/auth/login';
export const URL_REGISTER = '/customer/auth/register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';
const http = new Http();
const authApi = {
  
  registerAccount(body: { firstName: string; lastName: string; email: string; phone: string; password: string }) {
    return Http.post<AuthResponse>(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  }
};

export default authApi;
