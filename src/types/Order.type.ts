import { ProvinceDistrict, Ward } from './AddressModels.type';
import { Variant } from './product.type';

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
  discountPerItem: number;
};

export type CreateOrderRequest = {
  customerId: number;
  paymentMethod: string;
  phone: string;
  customerName: string;
  address: string;
  discount: number;
  orderVariantList: OrderVariant[];
  shippingFee: number;
};

export type OrderResponse = {
  orderId: number;
  customerId: number;
  paymentMethod: string;
  phone: string;
  customerName: string;
  address: string;
  discount: number;
  orderLines: OrderLine[];
  payment: Payment;
  status: string;
  createdAt: Date;
};

export type OrderLine = {
  quantity: number;
  price: number;
  returnQuantity: number;
  variant: Variant;
};

export type Payment = {
  id: number;
  amount: number;
  orderId: number;
  paymentMethod: string;
  orderType: string;
  paymentStatus: PaymentStatus;
  payDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = 'PENDING' | 'SHIPPING' | 'DELIVERED' | 'CANCELED';
export type PaymentStatus = 'INIT' | 'COMPLETE';

export const getPaymentStatusName = (status: PaymentStatus) => {
  switch (status) {
    case 'INIT':
      return 'Chưa thanh toán';
    case 'COMPLETE':
      return 'Đã thanh toán';
    default:
      return '';
  }
};

export const getPaymentMethodName = (paymentMethod: string) => {
  switch (paymentMethod) {
    case 'COD':
      return 'Thu hộ (COD)';
    case 'TRANSFER':
      return 'Chuyển khoản';
    default:
      return '';
  }
};
