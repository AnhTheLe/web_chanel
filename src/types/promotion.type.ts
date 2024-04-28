export type PromotionValueType = 'PERCENTAGE' | 'FIXED';

export type PromotionResponse = {
  id: number;
  description?: string;
  policyApply: string;
  title: string;
  value: number;
  valueType: PromotionValueType;
  startDate: string;
  endDate: string;
  active: boolean;
};
