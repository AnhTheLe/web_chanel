import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import addressApi from 'src/api/address.api';
import purchaseApi from 'src/api/shoppingCart.api';
import { AppContext } from 'src/contexts/app.context';
import useStyles from './CheckoutPage.style';
import { CreateOrderRequest, CreateOrderRequestModel, OrderVariant } from 'src/types/Order.type';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleValidateCheckout } from './CheckoutValidate';
import { getAddressName } from '../User/pages/Address/Components/AddressItem/AddressItem';
import { mapCustomerAddressResponseToView } from 'src/helpers/addressHelper';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import SignOutIcon from 'src/assets/svg/SignOutIcon';
import { CustomerAddress } from 'src/types/user.type';
import DropdownSearchOption from './Components/dropdownSearchOption/DropdownSearchOption';
import InputChoiceProvinceDistrict from '../User/pages/Address/Components/InputChoiceProvinceDistrict/InputChoiceProvinceDistrict';
import InputChoiceWard from '../User/pages/Address/Components/InputChoiceWard/InputChoiceWard';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import { ExtendedPurchase } from 'src/types/purchase.type';
import VariantItem from './Components/VariantItems/VariantItem';
import ArrowLeftIcon from 'src/assets/svg/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
import promotionApi from 'src/api/promotion.api';
import { PromotionResponse } from 'src/types/promotion.type';
import { toast } from 'react-toastify';
import orderApi from 'src/api/order.api';
import { debounce } from 'lodash';

const CheckoutPage = () => {
  const classes = useStyles();
  const { extendedPurchases, setExtendedPurchases, profile } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [couponCode, setCouponCode] = useState('' as string);
  const [promotionCoupon, setPromotionCoupon] = useState<PromotionResponse>();

  const navigate = useNavigate();

  const { data: purchasesInCartData, refetch: refetchPurchases } = useQuery({
    queryKey: ['purchases'],
    queryFn: purchaseApi.getPurchases
  });

  const emptyAddress = {
    id: -1,
    address: '',
    province: '',
    district: '',
    ward: '',
    phone: '',
    customerName: ''
  } as CustomerAddress;

  const getPromotion = useMutation({
    mutationFn: promotionApi.getCoupon,
    onSuccess: (data) => {
      setPromotionCoupon(data.data.data);
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      });
    }
  });

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {}
  });

  const createOrderMutation = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      });
      const purchasesIds = checkedPurchases.map((purchase) => purchase.variant.id);
      deletePurchasesMutation.mutate(purchasesIds);
      navigate(path.home);
    }
  });

  // const deletePurchasesMutation = useMutation({
  //   mutationFn: purchaseApi.deletePurchase,
  //   onSuccess: () => {
  //     refetchPurchases();
  //   }
  // });

  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAllAddress
  });

  const listAddresses = [emptyAddress, addresses?.data.data].flat();

  const purchasesInCart = purchasesInCartData?.data.data;
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases]);
  const isNotAllChecked = useMemo(() => extendedPurchases.every((purchase) => !purchase.checked), [extendedPurchases]);

  useEffect(() => {
    if (isNotAllChecked && (purchasesInCart?.length ?? 0) > 0) {
      setExtendedPurchases(
        purchasesInCart?.map((purchase) => ({ ...purchase, checked: true, disabled: false }) as ExtendedPurchase) || []
      );
    }
  }, [isNotAllChecked, purchasesInCart, setExtendedPurchases]);
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases]);
  const checkedPurchasesCount = checkedPurchases.length > 0 ? checkedPurchases.length : purchasesInCart?.length ?? 0;
  const defaultAddress = listAddresses.find((address) => address?.isDefault);
  const totalCheckedPurchasePrice = useMemo(
    () => {
      const total = checkedPurchases.reduce((result, current) => {
        return result + current.variant.discountedPrice * current.quantity;
      }, 0);
      const discount = promotionCoupon
        ? promotionCoupon?.valueType === 'PERCENTAGE'
          ? (total * promotionCoupon?.value) / 100
          : promotionCoupon?.value
        : 0;
      return total - (discount ?? 0);
    },
    [checkedPurchases, promotionCoupon] // Add a comma here
  );
  const totalCheckedPurchaseSavingPrice = useMemo(() => {
    const totalDiscount = checkedPurchases.reduce((result, current) => {
      return result + (current.variant.discountedPrice - current.variant.retailPrice) * current.quantity;
    }, 0);
    const totalDiscountCoupon = promotionCoupon
      ? promotionCoupon?.valueType === 'PERCENTAGE'
        ? (totalCheckedPurchasePrice * promotionCoupon?.value) / 100
        : promotionCoupon?.value
      : 0;

    return totalDiscount + totalDiscountCoupon;
  }, [checkedPurchases, promotionCoupon, totalCheckedPurchasePrice]);

  const [addressSelected, setAddressSelected] = useState<CustomerAddress>(defaultAddress || emptyAddress);

  const getInitialValues = (): CreateOrderRequestModel => {
    const orderVariants =
      checkedPurchasesCount && checkedPurchasesCount > 0
        ? checkedPurchases.map((purchase) => {
            return {
              variantId: purchase.variant.id,
              quantity: purchase.quantity
            } as OrderVariant;
          })
        : purchasesInCart?.map((purchase) => {
            return {
              variantId: purchase.variant.id,
              quantity: purchase.quantity
            } as OrderVariant;
          });

    const address = defaultAddress ? getAddressName(defaultAddress) : '';
    return {
      customerId: profile?.id,
      orderVariants: orderVariants,
      address: address,
      paymentMethod: 'COD',
      discount: 0
      // name: addressSelected.customerName
    } as unknown as CreateOrderRequestModel;
  };

  const [openDpObjectType, setOpenDpObjectType] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    watch,
    formState: { errors }
  } = useForm<CreateOrderRequestModel>({
    mode: 'onSubmit',
    defaultValues: getInitialValues(),
    shouldUnregister: false,
    resolver: yupResolver<any>(handleValidateCheckout())
  });

  useEffect(() => {
    if (listAddresses && defaultAddress) {
      reset(mapCustomerAddressResponseToView(defaultAddress!));
    } else {
      reset({});
    }
  }, [addresses, reset]);

  const handleChangeAddress = (value: number) => {
    const ad = listAddresses.find((item) => item?.id === value) ?? emptyAddress;
    setAddressSelected(ad);
    setOpenDpObjectType(false);
    setValue('address', getAddressName(ad));
    setValue('name', ad.customerName ?? '');
    setValue('phone', ad.phone ?? '');
  };

  const handleChangePaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  const handleClickApply = () => {
    if (couponCode && couponCode !== '') {
      getPromotion.mutate(couponCode);
    } else {
      setPromotionCoupon(undefined);
    }
  };

  const handleClickOrder = () => {
    const data = getValues();
    const orderData = {
      phone: data.phone ?? profile?.phone,
      address: `${data.address} ${getAddressName(addressSelected)}`,
      customerName: data.name ?? profile?.name,
      customerId: profile?.id,
      paymentMethod: paymentMethod,
      discount: totalCheckedPurchaseSavingPrice ?? 0,
      orderVariantList: checkedPurchases.map((purchase) => {
        return { variantId: purchase.variant.id, quantity: purchase.quantity } as OrderVariant;
      })
    } as unknown as CreateOrderRequest;
    console.log('orderData', orderData);
    createOrderMutation.mutateAsync(orderData);
  };

  return (
    <Box className={classes.root}>
      <Grid container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50px',
            backgroundPosition: 'center'
          }}
        >
          <Box className={classes.addressForm}>
            <Box className={'px-4'} minWidth={'370px'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  width: '100%'
                }}
              >
                <TypographyCus size={TEXTSIZE.size18} fontWeight='medium' style={{ width: '100%' }}>
                  Thông tin đơn hàng
                </TypographyCus>
                <Box className='flex' style={{ width: '42%' }}>
                  <SignOutIcon />
                  <TypographyCus size={TEXTSIZE.size14} fontWeight='medium' className='pl-2'>
                    Đăng xuất
                  </TypographyCus>
                </Box>
              </Box>

              <Box className={classes.groupItem}>
                <TypographyCus
                  size={TEXTSIZE.size12}
                  fontWeight='regular'
                  textColor='#79808A'
                  className={classes.label}
                >
                  Sổ địa chỉ
                </TypographyCus>

                <DropdownSearchOption
                  value={addressSelected.id!}
                  options={listAddresses.filter((item) => item?.id !== undefined).map((item) => item!.id || 0)}
                  idForItem={(item: number) => item}
                  renderOption={(item: number) =>
                    listAddresses &&
                    listAddresses.length > 0 &&
                    listAddresses.some((obj) => obj?.id === item && item !== -1)
                      ? getAddressName(listAddresses.find((obj) => obj?.id === item)!)
                      : 'Địa chỉ khác'
                  }
                  onChange={(item: number) => {
                    console.log('item1', item);
                    handleChangeAddress(item);
                  }}
                  open={openDpObjectType}
                  onOpen={() => {
                    setOpenDpObjectType(true);
                  }}
                  onClose={() => {
                    setOpenDpObjectType(false);
                  }}
                  renderValue={(item: number) => (
                    <TypographyCus
                      size={TEXTSIZE.size14}
                      fontWeight='regular'
                      // textColor='#79808A'
                      className={classes.label}
                      maxWidth={'370px'}
                      minWidth={'370px'}
                      noWrap
                    >
                      {listAddresses &&
                      listAddresses.length > 0 &&
                      listAddresses.some((obj) => obj?.id === Number(item) && item !== -1)
                        ? getAddressName(listAddresses.find((obj) => obj?.id === item)!)
                        : 'Địa chỉ khác'}
                    </TypographyCus>
                  )}
                  loading={false}
                  hasSearch={false}
                />
              </Box>

              <Controller
                render={({ field }) => (
                  <Box className={classes.groupItem}>
                    <TypographyCus
                      size={TEXTSIZE.size12}
                      fontWeight='regular'
                      textColor='#79808A'
                      className={classes.label}
                    >
                      Email
                    </TypographyCus>
                    <TextField
                      {...field}
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      fullWidth
                      defaultValue={profile?.email}
                      disabled
                      // label='Họ và tên'
                      size='small'
                      variant={'outlined'}
                    />
                  </Box>
                )}
                control={control}
                name='email'
              />

              <Controller
                render={({ field }) => (
                  <Box className={classes.groupItem}>
                    <TypographyCus
                      size={TEXTSIZE.size12}
                      fontWeight='regular'
                      textColor='#79808A'
                      className={classes.label}
                    >
                      Họ và tên
                    </TypographyCus>
                    <TextField
                      {...field}
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      fullWidth
                      defaultValue={addressSelected.customerName}
                      placeholder='Nhập họ và tên'
                      // label='Họ và tên'
                      size='small'
                      variant={'outlined'}
                    />
                  </Box>
                )}
                control={control}
                name='name'
              />

              <Controller
                render={({ field }) => (
                  <Box className={classes.groupItem}>
                    <TypographyCus
                      size={TEXTSIZE.size12}
                      fontWeight='regular'
                      textColor='#79808A'
                      className={classes.label}
                    >
                      Số điện thoại (tuỳ chọn)
                    </TypographyCus>
                    <TextField
                      {...field}
                      error={!!errors.phone}
                      helperText={errors?.phone?.message}
                      fullWidth
                      defaultValue={addressSelected.phone}
                      placeholder='Nhập số điện thoại'
                      // label='Họ và tên'
                      size='small'
                      variant={'outlined'}
                    />
                  </Box>
                )}
                control={control}
                name='phone'
              />

              <Controller
                render={({ field }) => (
                  <Box className={classes.groupItem}>
                    <TypographyCus
                      size={TEXTSIZE.size12}
                      fontWeight='regular'
                      textColor='#79808A'
                      className={classes.label}
                    >
                      Địa chỉ (tuỳ chọn)
                    </TypographyCus>
                    <TextField
                      {...field}
                      error={!!errors.phone}
                      helperText={errors?.phone?.message}
                      fullWidth
                      defaultValue={addressSelected.address}
                      // label='Họ và tên'
                      placeholder='Nhập địa chỉ'
                      size='small'
                      variant={'outlined'}
                    />
                  </Box>
                )}
                control={control}
                name='address'
              />

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
            </Box>
            <Box className={'px-4'}>
              <TypographyCus size={TEXTSIZE.size18} fontWeight='medium'>
                Vận chuyển
              </TypographyCus>
              <Box className={classes.shipmentFee}>
                <Radio checked={true} value='a' name='radio-buttons' inputProps={{ 'aria-label': 'A' }} />

                <Box className='flex justify-between items-center w-[100%]'>
                  <TypographyCus size={TEXTSIZE.size14} fontWeight='regular' style={{ paddingRight: 32 }}>
                    {formatPriceWithVNDCurrency(40000)}
                  </TypographyCus>
                  <TypographyCus size={TEXTSIZE.size14} fontWeight='regular'>
                    Giao tận nơi
                  </TypographyCus>
                </Box>
              </Box>
              <TypographyCus size={TEXTSIZE.size18} fontWeight='medium'>
                Thanh toán
              </TypographyCus>

              <Box className={classes.paymentMethod}>
                <Box>
                  <Radio
                    value='COD'
                    checked={paymentMethod === 'COD'}
                    onChange={handleChangePaymentMethod}
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'A' }}
                  />
                  <TypographyCus size={TEXTSIZE.size14} fontWeight='regular'>
                    Thu hộ (COD)
                  </TypographyCus>
                </Box>
                <Box style={{ borderBottom: '1px solid #DBDDDF', width: '100%' }}></Box>
                <Box>
                  <Radio
                    value='TRANSFER'
                    checked={paymentMethod === 'TRANSFER'}
                    onChange={handleChangePaymentMethod}
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'A' }}
                  />
                  <TypographyCus size={TEXTSIZE.size14} fontWeight='regular'>
                    Chuyển khoản
                  </TypographyCus>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.variantsInfo}>
            <Box className='pb-4'>
              <TypographyCus size={TEXTSIZE.size18} fontWeight='medium'>
                Đơn hàng {`(${checkedPurchasesCount} sản phẩm)`}
              </TypographyCus>
            </Box>

            <Box padding={'16px 0'} style={{ borderTop: '1px solid #e1e1e1', paddingBottom: 16 }}>
              {checkedPurchases.map((purchase, index) => (
                <VariantItem key={index} variant={purchase.variant} quantity={purchase.quantity} />
              ))}
            </Box>
            <Box sx={{ borderTop: '1px solid #e1e1e1', padding: '16px 0' }}>
              <Box className='flex flex-row justify-between items-center'>
                <TextField
                  // label='Họ và tên'
                  placeholder='Nhập mã giảm giá'
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                  size='small'
                  variant={'outlined'}
                  sx={{
                    marginRight: '16px'
                  }}
                />

                <Button variant='contained' onClick={handleClickApply}>
                  <TypographyCus size={TEXTSIZE.size14} textColor='#fff' fontWeight='regular' maxWidth={'100px'} noWrap>
                    Áp dụng
                  </TypographyCus>
                </Button>
              </Box>
            </Box>
            <Box sx={{ borderTop: '1px solid #e1e1e1', padding: '16px 0' }}>
              <Box className='flex flex-row justify-between items-center'>
                <TypographyCus
                  size={TEXTSIZE.size14}
                  textColor='#717171'
                  fontWeight='regular'
                  maxWidth={'100px'}
                  noWrap
                >
                  Tạm tính
                </TypographyCus>

                <TypographyCus
                  size={TEXTSIZE.size14}
                  textColor='#717171'
                  fontWeight='regular'
                  maxWidth={'100px'}
                  noWrap
                >
                  {formatPriceWithVNDCurrency(totalCheckedPurchasePrice)}
                </TypographyCus>
              </Box>
              <Box className='flex flex-row justify-between items-center'>
                <TypographyCus
                  size={TEXTSIZE.size14}
                  textColor='#717171'
                  fontWeight='regular'
                  maxWidth={'100px'}
                  noWrap
                >
                  Phí vận chuyển
                </TypographyCus>

                <TypographyCus
                  size={TEXTSIZE.size14}
                  textColor='#717171'
                  fontWeight='regular'
                  maxWidth={'100px'}
                  noWrap
                >
                  {formatPriceWithVNDCurrency(40000)}
                </TypographyCus>
              </Box>
            </Box>
            <Box sx={{ borderTop: '1px solid #e1e1e1', padding: '16px 0' }}>
              <Box className='flex flex-row justify-between items-center'>
                <TypographyCus
                  size={TEXTSIZE.size18}
                  textColor='#717171'
                  fontWeight='regular'
                  maxWidth={'100px'}
                  noWrap
                >
                  Tổng cộng
                </TypographyCus>

                <TypographyCus size={TEXTSIZE.size22} textColor='#2a9dcc' fontWeight='regular'>
                  {formatPriceWithVNDCurrency(totalCheckedPurchasePrice + 40000)}
                </TypographyCus>
              </Box>
            </Box>

            <Box sx={{ padding: '16px 0' }}>
              <Box className='flex flex-row justify-between items-center'>
                <Box className='flex flex-row items-center cursor-pointer'>
                  <ArrowLeftIcon htmlColor='#2a9dcc'></ArrowLeftIcon>
                  <TypographyCus
                    size={TEXTSIZE.size14}
                    textColor='#2a9dcc'
                    fontWeight='regular'
                    onClick={() => navigate(path.cart)}
                  >
                    Quay về giỏ hàng
                  </TypographyCus>
                </Box>

                <Button variant='contained' onClick={handleClickOrder}>
                  <TypographyCus size={TEXTSIZE.size14} textColor='#fff' fontWeight='regular' maxWidth={'100px'} noWrap>
                    Đặt hàng
                  </TypographyCus>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
