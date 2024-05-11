import { PromotionResponse } from 'src/types/promotion.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const promotionApi = {
  getCoupon: (title: string) => {
    return http.get<SuccessResponse<PromotionResponse>>(`/promotion/coupon?title=${title}`);
  }
};

export default promotionApi;
