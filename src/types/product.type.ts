import { PromotionResponse } from './promotion.type';

export interface ProductList<Data> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: Data[];
}

export interface ProductFilter {
  page?: number;
  size?: number | string;
  sort_by?: 'created_at' | 'name' | 'price';
  order?: 'asc' | 'desc';
  query?: string;
  categoryIds?: string;
  startDate?: string;
  endDate?: string;
}

export enum ProductFilterItem {
  size = 'size',
  page = 'page',
  query = 'query',
  categoryIds = 'categoryIds',
  startDate = 'startDate',
  endDate = 'endDate',
  sortBy = 'sort_by',
  order = 'order'
}

export type Product = {
  name: string;
  categoryIds?: string;
  label?: string;
  variantNumber: number;
  quantity: number;
  attribute1: string;
  attribute2: string;
  attribute3: string;
  images: string[];
  variants: Variant[];
};

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
