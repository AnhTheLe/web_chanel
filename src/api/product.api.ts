import { Product, ProductFilter, ProductList, TopSaleVariantType, Variant } from 'src/types/product.type';
import { ResponseApi } from 'src/types/utils.type';
import http from 'src/utils/http';

const productApi = {
  getListVariants: (params: ProductFilter) => {
    return http.get<ProductList<Variant>>('variants', { params });
  },
  getProductDetail: (id: number) => {
    return http.get<ResponseApi<Product[]>>(`products/${id}`);
  },
  getTopDiscountVariant: () => {
    return http.get<ResponseApi<Variant[]>>('variants/top-discount');
  },
  getTopSaleVariant: () => {
    return http.get<ResponseApi<TopSaleVariantType[]>>('variants/top-sale');
  }
};

export default productApi;
