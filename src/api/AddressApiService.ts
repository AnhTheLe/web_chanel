import axios, { AxiosResponse } from 'axios';

import districtsData from './Address/districts.json';
import provincesData from './Address/province.json';
import regionsData from './Address/regions.json';
import wardsData from './Address/wards.json';
import { District, PhoneRegion, Province, Ward } from 'src/types/AddressModels.type';

export default class AddressApiService {
  static async getPhoneRegions(): Promise<PhoneRegion[]> {
    const response = await axios.get<{ regions: PhoneRegion[] }>('/admin/supported_phone_regions');
    return response.data.regions;
  }

  static async getProvincesByCountryId(country_id: number): Promise<Province[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(provinces.filter((c) => c.country_id === country_id));
      }, 100);
    });
  }
  static async getDistricts(country_id: number): Promise<District[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(districts);
      }, 100);
    });
  }
  static async getWards(district_id: number): Promise<Ward[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(district_id ? wards.filter((w) => w.district_id === district_id) : []);
      }, 100);
    });
  }
}

const provinces: Province[] = provincesData;
const districts: District[] = districtsData;
const wards: Ward[] = wardsData;
// const regions: Region[] = regionsData;
