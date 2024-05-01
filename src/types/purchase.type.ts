import { Variant } from './product.type';

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurchaseStatus | 0;

export interface Purchase {
  idCart: string;
  quantity: number;
  variant: Variant;
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean;
  checked: boolean;
}
