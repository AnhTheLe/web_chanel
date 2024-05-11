import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import colors from '../../../../../../theme/statics/colors';

import InputChoiceProvinceDistrict from '../InputChoiceProvinceDistrict/InputChoiceProvinceDistrict';
import InputChoiceWard from '../InputChoiceWard/InputChoiceWard';

import { handleValidateCustomer } from './CustomerValidate';
import useStyles from './PopupAddress.style';
import { CustomerAddress, CustomerAddressModelView, CustomerAddressRequest } from 'src/types/user.type';
import { ProvinceDistrict, Ward } from 'src/types/AddressModels.type';
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
import { useMutation } from '@tanstack/react-query';
import addressApi from 'src/api/address.api';
import { mapCustomerAddressResponseToView } from 'src/helpers/addressHelper';

interface PopupAddressProps {
  open: boolean;
  address?: CustomerAddress;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isCreate?: boolean;
  onClosed?: () => void;
}

const PopupAddress = (props: PopupAddressProps) => {
  const classes = useStyles();
  const { address, open, isCreate, setOpen, onClosed } = props;
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

  useEffect(() => {
    if (address) {
      reset(mapCustomerAddressResponseToView(address));
    } else {
      reset({});
    }
  }, [open, address]);

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

  const addAddress = useMutation({
    mutationFn: addressApi.addAddress,
    onSuccess: (data) => {
      toast.success(data.data.message, { autoClose: 1000 });
    },
    onError: (error) => {
      toast.error('Có lỗi trong quá trình thêm đạ chỉ');
    }
  });

  const updateAddress = useMutation({
    mutationFn: addressApi.updateAddress,
    onSuccess: (data) => {
      toast.success(data.data.message, { autoClose: 1000 });
    },
    onError: (error) => {
      toast.error('Có lỗi trong quá trình cập nhật địa chỉ');
    }
  });

  const handleCreate = async (values: CustomerAddressModelView) => {
    const req = mapToCustomerAddressRequest(values);
    await addAddress.mutateAsync(req);
    setOpen(false);
    if (onClosed) {
      onClosed();
    }
  };

  const handleUpdate = async (values: CustomerAddressModelView) => {
    if (values.id) {
      const req = mapToCustomerAddressRequest(values);
      await updateAddress.mutateAsync({ id: values.id, payload: req });
      setOpen(false);
      if (onClosed) {
        onClosed();
      }
    }
  };

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
              <TypographyCus size={TEXTSIZE.size12} textColor={'#79808A'}>
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
              <TypographyCus size={TEXTSIZE.size12} textColor={'#79808A'}>
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
              <TypographyCus size={TEXTSIZE.size12} textColor={'#79808A'}>
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
