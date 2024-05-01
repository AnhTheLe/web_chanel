import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'src/components/Button';
import { Purchase } from 'src/types/purchase.type';
import { generateNameId } from 'src/utils/utils';
import { produce } from 'immer';
import keyBy from 'lodash/keyBy';
import { toast } from 'react-toastify';
import { AppContext } from 'src/contexts/app.context';
import noproduct from 'src/assets/img/no-product.png';
import purchaseApi from 'src/api/shoppingCart.api';
import path from 'src/constants/path';
import QuantityController from 'src/components/QuantityController';
import { Box, Grid } from '@mui/material';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import footerImg from 'src/assets/img/HomePage/footerImg.png';

export default function ShoppingCart() {
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
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={{
        borderBottom: 'solid thin #E5E5E5',
        backgroundImage: `url(${footerImg})`
      }}
    >
      <Grid
        item
        xs={8}
        // className='bg-neutral-100'
      >
        <Box className='py-10'>
          <Box className='container'>
            {extendedPurchases.length > 0 ? (
              <>
                <Box className='overflow-auto'>
                  <Box className='max-w-[100%]'>
                    <Box className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
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
                      <Box className='my-3 rounded-sm bg-white p-5 shadow'>
                        {extendedPurchases.map((purchase, index) => (
                          <Box
                            key={purchase.variant.id}
                            className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
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
                                        id: purchase.variant.id.toString()
                                      })}`}
                                    >
                                      <img alt={purchase.variant.name} src={purchase.variant.image} />
                                    </Link>
                                    <Box className='flex-grow px-2 pt-1 pb-2'>
                                      <Link
                                        to={`${path.home}${generateNameId({
                                          name: purchase.variant.name,
                                          id: purchase.variant.id.toString()
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
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
                  <Box className='flex items-center'>
                    <Box className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange'
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                      />
                    </Box>
                    <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                      Chọn tất cả ({extendedPurchases.length})
                    </button>
                    <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchases}>
                      Xóa
                    </button>
                  </Box>

                  <Box className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                    <Box>
                      <Box className='flex items-center sm:justify-end'>
                        <Box>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</Box>
                        <Box className='ml-2 text-2xl text-orange'>
                          {formatPriceWithVNDCurrency(totalCheckedPurchasePrice)}
                        </Box>
                      </Box>
                      <Box className='flex items-center text-sm sm:justify-end'>
                        <Box className='text-gray-500'>Tiết kiệm</Box>
                        <Box className='ml-6 text-orange'>
                          {formatPriceWithVNDCurrency(totalCheckedPurchaseSavingPrice)}
                        </Box>
                      </Box>
                    </Box>
                    <Button
                      className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                      onClick={handleBuyPurchases}
                      disabled={buyProductsMutation.isPending}
                    >
                      Mua hàng
                    </Button>
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
      </Grid>
    </Grid>
  );
}
