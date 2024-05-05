import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo } from 'react';
import useModal from '../../hocs/modal/useModal';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import CloseIcon from 'src/assets/svg/CloseIcon';
import { produce } from 'immer';
import { useStyles } from './CartDialog.style';
import SuccessIcon from 'src/assets/svg/SuccessIcon';
import { AppContext } from 'src/contexts/app.context';
import { useMutation, useQuery } from '@tanstack/react-query';
import purchaseApi from 'src/api/shoppingCart.api';
import { Link, useLocation } from 'react-router-dom';
import { keyBy } from 'lodash';
import { toast } from 'react-toastify';
import noproduct from 'src/assets/img/no-product.png';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import path from 'src/constants/path';
import { generateNameId } from 'src/utils/utils';
import QuantityController from 'src/components/QuantityController';
import { Purchase } from 'src/types/purchase.type';

export interface ConfirmDialogProps {
  title?: string;
  message?: ReactNode;
  isDelete?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  deleteButtonText?: string;
  isOpenModal: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CartDialog = (props: ConfirmDialogProps) => {
  const { title, message, isDelete, confirmButtonText, cancelButtonText, deleteButtonText, isOpenModal, setOpen } =
    props;
  const closeModal = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: purchaseApi.getPurchases
  });
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch();
    }
  });
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch();
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      });
    }
  });
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch();
    }
  });
  const location = useLocation();
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId;
  const purchasesInCart = purchasesInCartData?.data.data;
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases]);
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases]);
  const checkedPurchasesCount = checkedPurchases.length;
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.variant.discountedPrice * current.quantity;
      }, 0),
    [checkedPurchases]
  );
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.variant.discountedPrice - current.variant.retailPrice) * current.quantity;
      }, 0),
    [checkedPurchases]
  );

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, 'idCart');
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase.idCart;
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase.idCart]?.checked)
          };
        }) || []
      );
    });
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchases]);

  useEffect(() => {
    return () => {
      history.replaceState(null, '');
    };
  }, []);

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    );
  };

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].quantity = value;
      })
    );
  };

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        })
      );
      updatePurchaseMutation.mutate({ productId: purchase.variant.id, quantity: value });
    }
  };

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex].variant.id;
    deletePurchasesMutation.mutate([purchaseId]);
  };

  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase.variant.id);
    deletePurchasesMutation.mutate(purchasesIds);
  };

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        productId: purchase.variant.id,
        quantity: purchase.quantity
      }));
      buyProductsMutation.mutate(body);
    }
  };

  return (
    <Dialog
      open={isOpenModal}
      onClose={closeModal}
      fullWidth
      maxWidth='md'
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle
        className={classes.dialogTitle}
        sx={{
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffb9a4',
          marginBottom: '8px'
        }}
      >
        <Box>
          <SuccessIcon htmlColor='#fff'></SuccessIcon>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' textColor={'#fff'} style={{ paddingLeft: '6px' }}>
            {title}
          </TypographyCus>
        </Box>
        <IconButton aria-label='close' className={classes.closeButton} onClick={closeModal}>
          <CloseIcon htmlColor={'#fff'} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.contentWrap}>
        <TypographyCus
          size={TEXTSIZE.size16}
          fontWeight='regular'
          textColor={'colors.ink[10]'}
          style={{ paddingTop: '8px' }}
        >
          Giỏ hàng của bạn hiện có {purchasesInCart?.length} sản phẩm
        </TypographyCus>
        <Box className='py-10'>
          <Box className='container'>
            {extendedPurchases.length > 0 ? (
              <>
                <Box>
                  <Box className='max-w-[100%]'>
                    <Box className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow '>
                      <Box className='col-span-5'>
                        <Box className='flex items-center'>
                          <Box className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={isAllChecked}
                              onChange={handleCheckAll}
                            />
                          </Box>
                          <Box className='flex-grow text-black'>Sản phẩm</Box>
                        </Box>
                      </Box>
                      <Box className='col-span-7'>
                        <Box className='grid grid-cols-6 text-center'>
                          <Box className='col-span-2'>Đơn giá</Box>
                          <Box className='col-span-2'>Số lượng</Box>
                          <Box className='col-span-1'>Số tiền</Box>
                          <Box className='col-span-1'>Thao tác</Box>
                        </Box>
                      </Box>
                    </Box>
                    {extendedPurchases.length > 0 && (
                      <Box className='my-3 rounded-sm bg-white p-5 shadow max-h-50 '>
                        <Box className='overflow-auto'>
                          {extendedPurchases.map((purchase, index) => (
                            <Box
                              key={purchase.variant.id}
                              className='mb-5 grid grid-cols-12 items-center rounded-sm bg-white py-2 px-4 text-center text-sm text-gray-500 first:mt-0'
                            >
                              <Box className='col-span-5'>
                                <Box className='flex'>
                                  <Box className='flex flex-shrink-0 items-center justify-center pr-3'>
                                    <input
                                      type='checkbox'
                                      className='h-5 w-5 accent-orange'
                                      checked={purchase.checked}
                                      onChange={handleCheck(index)}
                                    />
                                  </Box>
                                  <Box className='flex-grow'>
                                    <Box className='flex'>
                                      <Link
                                        className='h-20 w-20 flex-shrink-0'
                                        to={`${path.home}${generateNameId({
                                          name: purchase.variant.name,
                                          id: purchase.variant.id.toString(),
                                          productId: purchase.variant.baseId.toString()
                                        })}`}
                                        style={{ objectFit: 'cover' }}
                                      >
                                        <img
                                          alt={purchase.variant.name}
                                          src={purchase.variant.image}
                                          style={{ height: '100%' }}
                                        />
                                      </Link>
                                      <Box className='flex-grow px-2 pt-1 pb-2'>
                                        <Link
                                          to={`${path.home}${generateNameId({
                                            name: purchase.variant.name,
                                            id: purchase.variant.id.toString(),
                                            productId: purchase.variant.baseId.toString()
                                          })}`}
                                          className='text-left line-clamp-2'
                                        >
                                          {purchase.variant.name}
                                        </Link>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box className='col-span-7'>
                                <Box className='grid grid-cols-6 items-center'>
                                  <Box className='col-span-2'>
                                    <Box className='flex items-center justify-center'>
                                      {purchase.variant.discountedPrice !== purchase.variant.retailPrice && (
                                        <span className='line-through text-gray-400'>
                                          {formatPriceWithVNDCurrency(purchase.variant.retailPrice)}
                                        </span>
                                      )}
                                      <span className='ml-3'>
                                        {formatPriceWithVNDCurrency(purchase.variant.discountedPrice)}
                                      </span>
                                    </Box>
                                  </Box>
                                  <Box className='col-span-2'>
                                    <QuantityController
                                      max={purchase.variant.quantity}
                                      value={purchase.quantity}
                                      classNameWrapper='flex items-center'
                                      onIncrease={(value) =>
                                        handleQuantity(index, value, value <= purchase.variant.quantity)
                                      }
                                      onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                      onType={handleTypeQuantity(index)}
                                      onFocusOut={(value) =>
                                        handleQuantity(
                                          index,
                                          value,
                                          value >= 1 &&
                                            value <= purchase.variant.quantity &&
                                            value !== (purchasesInCart as Purchase[])[index].quantity
                                        )
                                      }
                                      disabled={purchase.disabled}
                                    />
                                  </Box>
                                  <Box className='col-span-1'>
                                    <span className='text-orange'>
                                      {formatPriceWithVNDCurrency(purchase.variant.discountedPrice * purchase.quantity)}
                                    </span>
                                  </Box>
                                  <Box className='col-span-1'>
                                    <button
                                      onClick={handleDelete(index)}
                                      className='bg-none text-black transition-colors hover:text-orange'
                                    >
                                      Xóa
                                    </button>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>{' '}
                      </Box>
                    )}
                  </Box>
                </Box>
              </>
            ) : (
              <Box className='text-center'>
                <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
                <Box className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</Box>
                <Box className='mt-5 text-center'>
                  <Link
                    to={path.home}
                    className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
                  >
                    Mua ngay
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogFooter}>
        <Box className='flex items-center sm:justify-end'>
          <Box>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</Box>
          <Box className='ml-2 text-2xl text-orange'>{formatPriceWithVNDCurrency(totalCheckedPurchasePrice)}</Box>
        </Box>
        <Button
          component='button' // Add the component prop with the value of 'button'
          style={{ backgroundColor: '#EB4444', border: '1px solid #F5A2A2', maxWidth: '40%', color: '#fff' }}
        >
          Thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
