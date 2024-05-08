import { ProvinceDistrict, Ward } from './AddressModels.type';

type Role = 'User' | 'Admin';

export interface User {
  id: string;
  role: Role;
  email: string;
  name: string;
  dateOfBirth: Date;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  gender: string;
  avatar: string;
  addresses: CustomerAddress[];
}

export type CustomerResponse = {
  id: number;
  state: string;
  email: string | null;
  verifiedEmail: boolean;
  phone: string | null;
  name: string | null;
  gender: string;
  dob: string | null;
  acceptsMarketing: boolean;
  orderCount: number;
  totalSpent: number;
  lastOrderId: number | null;
  lastOrderName: string | null;
  tag: string | null;
  note: string | null;
  createOn: Date;
  modifiedOn: Date;
  addresses: CustomerAddress[];
  defaultAddress: CustomerAddress;
};

export type CustomerAddressRequest = {
  id?: number | null;
  address?: string;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  countryCode?: string | null;
  province?: string | null;
  provinceCode?: string | null;
  district?: string | null;
  districtCode?: string | null;
  ward?: string | null;
  wardCode?: string | null;
  customerName?: string | null;
  phone?: string | null; // phone native
  zip?: string | null;
  isDefault?: boolean;
};
// kiểm tra nghiệp vụ API để set value/ null / undefined
export type CustomerAddressModelView = {
  id?: number;
  phone?: string; // phone after format region
  customerName?: string;
  address?: string;
  // group?: string;
  // employee?: string;
  phoneRegion?: string;
  provinceDistrict?: ProvinceDistrict;
  ward?: Ward | null;
  isDefault?: boolean;
};

export type CustomerAddress = {
  id?: number;
  address?: string;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  countryCode?: string | null;
  province?: string | null;
  provinceCode?: string | null;
  district?: string | null;
  districtCode?: string | null;
  ward?: string | null;
  wardCode?: string | null;
  customerName?: string | null;
  phone?: string | null; // phone native
  zip?: string | null;
  isDefault?: boolean;
};
