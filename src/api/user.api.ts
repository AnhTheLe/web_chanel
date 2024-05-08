import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface BodyUpdateProfile
  extends Omit<
    User,
    'id' | 'role' | 'createdAt' | 'updatedAt' | 'email' | 'addresses' | 'enabled' | 'avatar' | 'gender'
  > {
  password?: string;
  newPassword?: string;
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('customer/me');
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('customer/update', body);
  },
  updatePassword(body: { password: string; newPassword: string }) {
    return http.put<SuccessResponse<User>>('customer/update-password', body);
  }
};

export default userApi;
