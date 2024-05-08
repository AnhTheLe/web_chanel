export const Countries = {
  THAI_LAND: 181,
  VIET_NAM: 201
};
export type PhoneRegion = {
  id: string;
  text: string;
};
export type Ward = {
  id: number;
  name: string;
  code: string;
  province_id: number;
  district_id: number;
  district_code: string;
};
export type District = {
  id: number;
  name: string;
  code: string;
  province_id: number;
};
export type Province = {
  id: number;
  name: string;
  code: string;
  country_id: number;
};
export type Region = {
  id: string;
  text: string;
};
export type ProvinceDistrict = {
  id: string;
  district_id: number;
  province_id: number;
  province_name: string;
  district_name: string;
};
