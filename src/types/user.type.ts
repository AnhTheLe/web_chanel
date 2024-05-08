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
  firstName: string | null;
  lastName: string | null;
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

export type CustomerRequest = {
  id?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
  gender?: string | null;
  addresses?: CustomerAddress[];
  acceptsMarketing: boolean;
  dob?: string | null;
};
// kiểm tra nghiệp vụ API để set value/ null / undefined
export type CustomerModelView = {
  id?: number;
  email?: string;
  phone?: string; // phone after format region
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string | null;
  acceptsMarketing?: boolean;
  addresses?: CustomerAddress;
  // code?: string;
  // tags?: string[];
  address?: string;
  // group?: string;
  // employee?: string;
  phoneRegion?: string;
  provinceDistrict?: ProvinceDistrict;
  ward?: Ward | null;
};

export type CustomerAddress = {
  id?: number;
  address1?: string;
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
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null; // phone native
  zip?: string | null;
  default?: boolean;
};
