import { CreateOrderRequest } from 'src/types/Order.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const orderApi = {
  createOrder: (body: CreateOrderRequest) => {
    return http.post<SuccessResponse<null>>(`/order`, body);
  }
};

export default orderApi;