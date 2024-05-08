import _ from 'lodash';
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from 'src/utils/REGEX';
import * as yup from 'yup';

export const handleValidateCustomer = () => {
  return yup.object().shape({
    firstName: yup.string().nullable().max(50, 'Tên khách hàng không được vượt quá 50 kí tự'),
    lastName: yup.string().nullable().max(50, 'Họ khách hàng không được vượt quá 50 kí tự'),
    phone: yup.lazy(() => {
      return yup
        .string()
        .nullable()
        .test('invalid_phone_number', 'Số điện thoại không đúng định dạng', function (phone_number) {
          const { path, createError } = this as any;
          if (phone_number && phone_number.trim().length < 10) {
            return createError({
              path,
              message: 'Số điện thoại phải chứa ít nhất 10 kí tự'
            });
          } else if (_.isNil(phone_number) || phone_number.trim().length === 0) {
            return true;
          }
          if (phone_number) return REGEX_PHONE_NUMBER.test(phone_number);
        });
    }),
    email: yup
      .string()
      .nullable()
      .test('invalid_email', 'Email không đúng định dạng', (email) => {
        if (_.isNil(email) || email.trim().length === 0) {
          return true;
        }
        return REGEX_EMAIL.test(email);
      }),
    address: yup.string().nullable().max(255, 'Địa chỉ không được vượt quá 255 kí tự')
  });
};
