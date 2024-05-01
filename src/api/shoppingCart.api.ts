import { Purchase, PurchaseListStatus } from 'src/types/purchase.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL = '/user/cart';

const purchaseApi = {
  addToCart(body: { productId: number; quantity: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add`, body);
  },
  getPurchases() {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`);
  },
  buyProducts(body: { productId: number; quantity: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body);
  },
  updatePurchase(body: { productId: number; quantity: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body);
  },
  deletePurchase(purchaseIds: number[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}/delete`, {
      data: purchaseIds
    });
  }
};

export default purchaseApi;
