import { ProvinceDistrict, Ward } from './AddressModels.type';

export type CreateOrderRequestModel = {
  customerId: number;
  paymentMethod: string;
  email: string;
  phone: string;
  name: string;
  orderVariantList: OrderVariant[];
  provinceDistrict?: ProvinceDistrict;
  ward?: Ward | null;
  address: string;
  discount: number;
};

export type OrderVariant = {
  variantId: number;
  quantity: number;
};

export type CreateOrderRequest = {
  customerId: number;
  paymentMethod: string;
  phone: string;
  customerName: string;
  address: string;
  discount: number;
  orderVariantList: OrderVariant[];
};
