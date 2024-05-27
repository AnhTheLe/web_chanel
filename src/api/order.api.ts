import { CreateOrderRequest, OrderResponse } from 'src/types/Order.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const orderApi = {
  createOrder: (body: CreateOrderRequest) => {
    return http.post<SuccessResponse<null>>(`/order`, body);
  },
  getOrderList: () => {
    return http.get<SuccessResponse<OrderResponse[]>>(`/order`);
  },
  getOrderDetail: (id: number) => {
    return http.get<SuccessResponse<OrderResponse>>(`/order/${id}`);
  }
};

export default orderApi;
