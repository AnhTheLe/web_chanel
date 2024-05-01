import { PromotionResponse } from './promotion.type';

export interface ProductList<Data> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: Data[];
}

export interface ProductFilter {
  page?: number | string;
  size?: number | string;
  // sort_by?: 'createdAt' | 'view' | 'sold' | 'price';
  query?: string;
  categoryIds?: string;
  startDate?: string;
  endDate?: string;
}

export type Variant = {
  id: number;
  name: string;
  importPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  quantity: number;
  image: string;
  sku: string;
  barcode: string;
  baseId: number;
  value1: string;
  value2: string;
  value3: string;
  discount: number;
  discountedPrice: number;
  promotion: PromotionResponse;
};

export type TopSaleVariantType = {
  variant: Variant;
  quantity: number;
};
