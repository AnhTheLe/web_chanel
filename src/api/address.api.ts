import { CustomerAddress, CustomerAddressRequest } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL = '/address';

const addressApi = {
  getAllAddress: () => {
    return http.get<SuccessResponse<CustomerAddress[]>>(URL);
  },
  addAddress: (body: CustomerAddressRequest) => {
    return http.post<SuccessResponse<CustomerAddress>>(URL, body);
  },
  updateAddress: (body: { id: number; payload: CustomerAddressRequest }) => {
    return http.put<SuccessResponse<CustomerAddress>>(`${URL}/${body.id}`, body.payload);
  },
  deleteAddress: (addressId: number) => {
    return http.delete<SuccessResponse<CustomerAddress>>(URL, { data: addressId });
  }
};

export default addressApi;
