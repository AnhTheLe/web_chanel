import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('customer/me');
  }
};

export default userApi;
