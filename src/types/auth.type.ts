import { User } from './user.type';
import { SuccessResponse } from './utils.type';

export type AuthResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
  expires_refresh_token: number;
  expires: number;
  user: User;
}>;

export type RefreshTokenResponse = SuccessResponse<{ accessToken: string }>;
