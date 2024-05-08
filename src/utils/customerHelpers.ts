import { District, Province, ProvinceDistrict } from 'src/types/AddressModels.type';

export const getCustomerDisplayName = (customer: {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}) => {
  if (customer.lastName || customer.firstName) {
    return ((customer.lastName ?? '') + ' ' + (customer.firstName ?? '')).trim();
  }
  if (customer.email) {
    return customer.email;
  }
  return '---';
};

export const mapToProvinceDistricts = (provinces: Province[], districts: District[]) => {
  const provinceDistricts: ProvinceDistrict[] = [];
  if (provinces.length > 0 && districts.length > 0) {
    provinces.forEach((item) => {
      const listDistrictInCity = districts.filter((m) => m.province_id === item.id);
      if (!listDistrictInCity) {
        return;
      }
      listDistrictInCity.forEach((itemDistrict) => {
        if (provinceDistricts !== undefined) {
          provinceDistricts.push({
            id: `${item.id.toString()} - ${itemDistrict.id.toString()}`,
            district_id: itemDistrict.id,
            province_id: item.id,
            province_name: item.name,
            district_name: itemDistrict.name
          });
        }
      });
    });
  }
  return provinceDistricts;
};

export function removeAscent(str: string) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}
export const getGender = (title?: string | null) => {
  switch (title) {
    case 'Nam':
      return 'male';
    case 'Nữ':
      return 'female';
    default:
      return 'other';
  }
};
export const renderGender = (title?: string) => {
  switch (title) {
    case 'male':
      return 'Nam';
    case 'female':
      return 'Nữ';
    default:
      return 'Khác';
  }
};

export const renderPhone = (phone?: string | null) => {
  if (phone) return phone.replace('+84', '0');
};
