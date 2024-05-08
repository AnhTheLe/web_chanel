import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import colors from '../../../../../../theme/statics/colors';

import InputChoiceProvinceDistrict from '../InputChoiceProvinceDistrict/InputChoiceProvinceDistrict';
import InputChoiceWard from '../InputChoiceWard/InputChoiceWard';

import { handleValidateCustomer } from './CustomerValidate';
import useStyles from './PopupAddress.style';
import {
  CustomerAddress,
  CustomerAddressModelView,
  CustomerAddressRequest,
  CustomerResponse
} from 'src/types/user.type';
import { renderPhone } from 'src/utils/customerHelpers';
import { ProvinceDistrict, Ward } from 'src/types/AddressModels.type';
import { isNumber } from 'src/utils/numberUtils';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import CloseIcon from 'src/assets/svg/CloseIcon';
import PosCheckbox from 'src/components/checkbox/PosCheckbox';

interface PopupAddressProps {
  open: boolean;
  customer?: CustomerAddress;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isCreate?: boolean;
}

const PopupAddress = (props: PopupAddressProps) => {
  const { customer, open, isCreate, setOpen } = props;
  const [isShowAdvance, setIsShowAdvance] = useState<boolean>(false);
  const [btnOkLoading, setBtnOkLoading] = useState(false);
  const [initialValues, setInitValues] = useState<CustomerAddressModelView>({});
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    watch,
    formState: { errors }
  } = useForm<CustomerAddressModelView>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    shouldUnregister: false,
    resolver: yupResolver<any>(handleValidateCustomer())
  });

  const mapCustomerAddressResponseToView = (customer: CustomerAddress) => {
    return {
      id: customer.id,
      phone: customer.phone,
      customerName: customer.customerName,
      isDefault: customer.isDefault,
      address: customer.address ? customer.address : undefined,
      provinceDistrict: mapProvinceDistrict(customer),
      ward: mapWard(customer)
    } as CustomerAddressModelView;
  };

  const mapProvinceDistrict = (addressResponse: CustomerAddress) => {
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
  const mapWard = (addressResponse: CustomerAddress) => {
    return {
      id: Number(addressResponse.wardCode),
      name: addressResponse.ward,
      code: addressResponse.wardCode,
      district_id: Number(addressResponse.districtCode),
      province_id: Number(addressResponse.provinceCode),
      district_code: addressResponse.districtCode
    } as Ward;
  };

  useEffect(() => {
    if (customer) {
      reset(mapCustomerAddressResponseToView(customer));
    }
  }, [open, customer]);

  const onInvalid = (error: any) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  const handleValidateBeforeSubmit = () => {
    handleSubmit((data) => (isCreate ? handleCreate(data) : handleUpdate(data)), onInvalid)();
  };

  const mapToCustomerAddressRequest = (data: CustomerAddressModelView) => {
    const customerRequest: CustomerAddressRequest = {
      id: data.id ? data.id : null,
      customerName: data.customerName ?? '',
      // lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      province: data.provinceDistrict?.province_name,
      provinceCode: data.provinceDistrict?.province_id.toString(),
      district: data.provinceDistrict?.district_name,
      districtCode: data.provinceDistrict?.district_id.toString(),
      ward: data.ward?.name,
      wardCode: data.ward?.code,
      country: 'Việt Nam',
      countryCode: 'VN',
      zip: 'viet nam',
      isDefault: data.isDefault
    };

    return customerRequest;
  };

  const handleCreate = async (values: CustomerAddressModelView) => {
    const req = mapToCustomerAddressRequest(values);
    console.log('req', req);
    //   setBtnOkLoading(true);
    //   try {
    //     const customerRes = isOfflineMode
    //       ? await createCustomer(values, true)
    //       : (await CustomerApiService.addCustomer(req)).data.customer;
    //     if (customerRes && customerRes) {
    //       dispatch(
    //         setCustomer({
    //           tabId: currentTab,
    //           customer: customerRes
    //         })
    //       );
    //       handleClose();
    //       SnackbarUtils.success('Thêm mới khách hàng thành công');
    //     }
    //   } catch (error) {
    //     SnackbarUtils.error(getCustomerError(error));
    //   } finally {
    //     setBtnOkLoading(false);
    //   }
  };

  const handleUpdate = async (values: CustomerAddressModelView) => {
    // if (values.id) {
    //   setBtnOkLoading(true);
    //   const req = mapToCusomerRequest(values);
    //   try {
    //     if (isOfflineMode) {
    //       const customerRes = await createCustomer(values, false);
    //       dispatch(
    //         setCustomer({
    //           tabId: currentTab,
    //           customer: customerRes
    //         })
    //       );
    //       handleClose();
    //       SnackbarUtils.success('Cập nhật khách hàng thành công');
    //       setBtnOkLoading(false);
    //       return;
    //     }
    //     let customerAddress: CustomerAddress = {};
    //     const customerRes = await CustomerApiService.updateCustomer(req);
    //     //
    //     if (values.addresses && values.addresses.id) {
    //       const addressRes = await CustomerApiService.updateAddressCustomer(
    //         req.addresses ? req.addresses[0] : {},
    //         customer.id
    //       );
    //       customerAddress = addressRes.data.address;
    //     } else if (req.addresses) {
    //       const addressRes = await CustomerApiService.addAddressCustomer(
    //         req.addresses ? req.addresses[0] : {},
    //         customer.id
    //       );
    //       customerAddress = addressRes.data.address;
    //     }
    //     if (customerRes && customerRes.data.customer) {
    //       customerRes.data.customer.addresses[0] = customerAddress;
    //       customerRes.data.customer.defaultAddress = customerAddress;
    //       dispatch(
    //         setCustomer({
    //           tabId: currentTab,
    //           customer: customerRes.data.customer
    //         })
    //       );
    //       handleClose();
    //       SnackbarUtils.success('Cập nhật khách hàng thành công');
    //     }
    //   } catch (error) {
    //     SnackbarUtils.error(getCustomerError(error));
    //   } finally {
    //     setBtnOkLoading(false);
    //   }
    // } else {
    // }
  };
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      fullWidth
      maxWidth='sm'
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle className={classes.dialogTitle} component='div'>
        <TypographyCus size={TEXTSIZE.size20} fontWeight='medium'>
          {isCreate ? 'Thêm mới địa chỉ' : 'Chỉnh sửa địa chỉ'}
        </TypographyCus>
        <IconButton aria-label='close' className={classes.closeButton} onClick={() => setOpen(false)}>
          <CloseIcon htmlColor={colors.icon.secondary} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.contentWrap}>
        <Grid container style={{ gap: '0 0' }}>
          <Grid item xs={12} className={classes.contentItem}>
            <Box className={classes.title}>
              <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
                Họ và tên
              </TypographyCus>
            </Box>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors.customerName}
                  helperText={errors?.customerName?.message}
                  label='Họ và tên'
                  fullWidth
                  size='small'
                  variant={'outlined'}
                />
              )}
              control={control}
              name='customerName'
            />
          </Grid>
          <Grid item xs={12} className={classes.contentItem}>
            <Box className={classes.title}>
              <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
                Điện thoại
              </TypographyCus>
            </Box>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  label='Điện thoại'
                  fullWidth
                  size='small'
                  variant={'outlined'}
                />
              )}
              control={control}
              name='phone'
            />
          </Grid>

          <Grid item xs={12} className={classes.contentItem}>
            <Box className={classes.title}>
              <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
                Địa chỉ
              </TypographyCus>
            </Box>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  error={!!errors.address}
                  helperText={errors?.address?.message}
                  label='Địa chỉ'
                  fullWidth
                  size='small'
                  variant={'outlined'}
                />
              )}
              control={control}
              name='address'
            />
          </Grid>
          <Grid item xs={6} className={classes.contentItem}>
            <InputChoiceProvinceDistrict
              label='Khu vực'
              value={watch('provinceDistrict')}
              onChange={(value) => {
                setValue('provinceDistrict', value, {
                  shouldValidate: false
                });
                setValue('ward', null, {
                  shouldValidate: false
                });
              }}
              fetchOption
            />
          </Grid>
          <Grid item xs={6} className={classes.contentItem}>
            <InputChoiceWard
              label='Phường / Xã'
              districtId={watch('provinceDistrict.district_id')}
              value={watch('ward')}
              onChange={(value) => {
                setValue('ward', value, {
                  shouldValidate: false
                });
              }}
              fetchOption
            />
          </Grid>
          <Grid item xs={6} className={classes.contentItem}>
            {/* <Controller
              render={({ field }) => (
                <TextInput
                  {...field}
                  required
                  error={!!errors.gender}
                  helperText={errors?.gender?.message}
                  textLabel="Giới tính"
                  labelColor={colors.text[70]}
                  lablelTextSize={TEXTSIZE.size14}
                  fullWidth
                  size="small"
                  width={"100%"}
                  variant={"outlined"}
                />
              )}
              control={control}
              name="gender"
            /> */}
          </Grid>
          <Grid item xs={12} className={classes.contentItem}>
            <FormControlLabel
              control={
                <Controller
                  render={({ field }) => (
                    <PosCheckbox
                      {...field}
                      checked={field.value ?? false}
                      onChange={(e: any) => field.onChange(e.target.checked)}
                    />
                  )}
                  name='isDefault'
                  control={control}
                />
              }
              label={
                <TypographyCus size={TEXTSIZE.size14} textColor={colors.text[100]}>
                  Đặt làm địa chỉ mặc định
                </TypographyCus>
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className={classes.dialogFooter}>
        <Box display={'flex'}>
          <Box marginRight={'12px'}>
            <Button onClick={() => setOpen(false)} color='primary'>
              Hủy
            </Button>
          </Box>
          <Box>
            <Button onClick={() => handleValidateBeforeSubmit()} color='primary'>
              {isCreate ? 'Thêm ' : 'Cập nhật '}
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PopupAddress;
