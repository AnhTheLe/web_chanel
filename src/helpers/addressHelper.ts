import { ProvinceDistrict, Ward } from 'src/types/AddressModels.type';
import { CustomerAddress, CustomerAddressModelView } from 'src/types/user.type';

export const mapCustomerAddressResponseToView = (address: CustomerAddress) => {
  return {
    id: address?.id ?? -1,
    phone: address.phone,
    customerName: address.customerName,
    isDefault: address.isDefault,
    address: address.address ? address.address : undefined,
    provinceDistrict: mapProvinceDistrict(address),
    ward: mapWard(address)
  } as CustomerAddressModelView;
};

export const mapProvinceDistrict = (addressResponse: CustomerAddress) => {
  if (addressResponse.province) {
    return {
      id:
        addressResponse.provinceCode && addressResponse.districtCode
          ? addressResponse.provinceCode + ' - ' + addressResponse.districtCode
          : null,
      province_id: Number(addressResponse.provinceCode),
      province_name: addressResponse.province,
      district_id: Number(addressResponse.districtCode),
      district_name: addressResponse.district
    } as ProvinceDistrict;
  } else {
    return undefined;
  }
};
export const mapWard = (addressResponse: CustomerAddress) => {
  return {
    id: Number(addressResponse.wardCode),
    name: addressResponse.ward,
    code: addressResponse.wardCode,
    district_id: Number(addressResponse.districtCode),
    province_id: Number(addressResponse.provinceCode),
    district_code: addressResponse.districtCode
  } as Ward;
};
