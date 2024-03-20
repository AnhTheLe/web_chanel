import { User } from './user.type';
import { ResponseApi } from './utils.type';

export type AuthResponse = ResponseApi<{
  access_token: string;
  exprires: string;
  user: User;
}>;
