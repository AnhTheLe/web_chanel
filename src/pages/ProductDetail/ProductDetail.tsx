import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productApi from 'src/api/product.api';
import purchaseApi from 'src/api/shoppingCart.api';
import { useTranslation } from 'react-i18next';
import QuantityController from 'src/components/QuantityController';
import { Product as ProductType, Variant } from 'src/types/product.type';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import boxIcon from 'src/assets/img/productDetail/boxIcon.png';
import moneyIcon from 'src/assets/img/productDetail/moneyIcon.png';
import returnIcon from 'src/assets/img/productDetail/returnIcon.png';
import securityIcon from 'src/assets/img/productDetail/securityIcon.png';

import { getIdFromNameId, getOptionValueName } from 'src/utils/utils';
import { Box, FormControl, Grid, MenuItem, Select } from '@mui/material';
import DOMPurify from 'dompurify';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import useStyles from './ProductDetail.style';
import ArrowDownIcon from 'src/assets/svg/ArrowDownIcon';
import colors from 'src/theme/statics/colors';
import { toast } from 'react-toastify';
import ListSlideProducts from '../HomePage/components/ListSlideProducts/ListSlideProducts';

const ProductDetail = () => {
  const { nameId } = useParams();
  const classes = useStyles();
  const ids = getIdFromNameId(nameId as string);
  const { data: productDetailData } = useQuery({
    queryKey: ['product', Number(ids[1])],
    queryFn: () => productApi.getProductDetail(Number(ids[1]))
  });

  const { data: productsSuggestions } = useQuery({
    queryKey: ['productsSuggestions', Number(ids[1])],
    queryFn: () => productApi.getProductSuggestions(Number(ids[1]))
  });
  const queryClient = useQueryClient();
  const [buyCount, setBuyCount] = useState(1);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);

  const [activeImage, setActiveImage] = useState('');
  const product = productDetailData?.data.data;
  const listVariants = product?.variants;
  const listProductSuggestions = productsSuggestions?.data.data;
  const imageRef = useRef<HTMLImageElement>(null);
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  );
  const [variantSelected, setVariantSelected] = useState<Variant | undefined>(
    product?.variants.find((v) => v.id === Number(ids[0]))
  );

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
    if (product && product.variants.length > 0) {
      setVariantSelected(product?.variants.find((v) => v.id === Number(ids[0])));
    }
  }, [product]);

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const chooseActive = (img: string) => {
    setActiveImage(img);
  };

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + 'px';
    image.style.height = naturalHeight + 'px';
    image.style.maxWidth = 'unset';
    image.style.top = top + 'px';
    image.style.left = left + 'px';
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style');
  };

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const addToCartMutation = useMutation({
    mutationFn: () => {
      return purchaseApi.addToCart({ productId: variantSelected!.id, quantity: buyCount });
    }
  });

  const handleClickAddToCart = () => {
    addToCartMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.data.message, { autoClose: 1000 });
        queryClient.invalidateQueries({ queryKey: ['purchases'] });
        setBuyCount(1);
      },
      onError: () => {
        toast.error('Có lỗi khi thêm sản phẩm vào đơn hàng', { autoClose: 1000 });
      }
    });
  };

  const buyNow = async () => {
    // const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string });
    // const purchase = res.data.data;
    // navigate(path.cart, {
    //   state: {
    //     purchaseId: purchase._id
    //   }
    // });
  };

  if (!product) return null;
  return (
    <Box sx={{ margin: '36px 0' }}>
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
            padding: '0 20px'
          }}
        >
          <Box className='py-6 w-full'>
            <Box className='container'>
              <Box className='bg-white'>
                <Box className='grid grid-cols-12 gap-12 '>
                  <Box className='col-span-6'>
                    <Box
                      className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                      onMouseMove={handleZoom}
                      onMouseLeave={handleRemoveZoom}
                    >
                      <img
                        src={activeImage}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                        ref={imageRef}
                      />
                    </Box>
                    <Box className='relative mt-4 grid grid-cols-5 gap-1 px-6'>
                      <button
                        className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                        onClick={prev}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-5 w-5'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                        </svg>
                      </button>
                      {currentImages.map((img) => {
                        const isActive = img === activeImage;
                        return (
                          <Box className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                            <img
                              src={img}
                              alt={product.name}
                              className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                            />
                            {isActive && <Box className='absolute inset-0 border-2 border-orange' />}
                          </Box>
                        );
                      })}
                      <button
                        className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                        onClick={next}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-5 w-5'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                        </svg>
                      </button>
                    </Box>
                  </Box>
                  <Box className='col-span-6 w-full'>
                    <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                    <Box className='my-6 flex items-center '>
                      {variantSelected?.discountedPrice !== variantSelected?.retailPrice && (
                        <Box className='text-gray-500 line-through mr-3'>
                          {formatPriceWithVNDCurrency(variantSelected?.retailPrice)}
                        </Box>
                      )}
                      <Box className='text-3xl font-medium text-orange'>
                        {formatPriceWithVNDCurrency(variantSelected?.discountedPrice)}
                      </Box>
                    </Box>
                    {listVariants && listVariants.length > 1 && variantSelected && (
                      <FormControl className={classes.formControl} variant='outlined'>
                        <Select
                          classes={{ outlined: classes.selectOutlined, select: classes.select }}
                          MenuProps={{
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            transformOrigin: { vertical: 'top', horizontal: 'left' },
                            classes: { list: classes.menuList },
                            autoFocus: false
                          }}
                          value={variantSelected}
                          variant='outlined'
                          IconComponent={({ ...props }) => ArrowDownIcon({ ...props, strokeWidth: 1 })}
                          renderValue={(value: any) => {
                            return (
                              <TypographyCus
                                size={TEXTSIZE.size14}
                                textColor={colors.text[100]}
                                style={{ maxWidth: '90%' }}
                                noWrap
                                // ellipsis={1}
                              >
                                {getOptionValueName(variantSelected!)}
                              </TypographyCus>
                            );
                          }}
                        >
                          {listVariants?.map((p, index) => {
                            return (
                              <MenuItem
                                value={p.name}
                                key={index}
                                classes={{ root: classes.menuItem }}
                                onClick={() => {
                                  setVariantSelected(p);
                                }}
                              >
                                <TypographyCus size={TEXTSIZE.size14} textColor={colors.text[90]} noWrap>
                                  {getOptionValueName(p)}
                                </TypographyCus>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                    <Box className='grid grid-cols-12 py-4 border-b-[2px]'>
                      <Box className='col-span-5'>
                        <Box className='flex justify-start mb-5'>
                          <img src={boxIcon} alt='' className='pr-2' />
                          <TypographyCus size={TEXTSIZE.size14}>Giao hàng toàn quốc</TypographyCus>
                        </Box>

                        <Box className='flex justify-start'>
                          <img src={returnIcon} alt='' className='pr-2' />
                          <TypographyCus size={TEXTSIZE.size14}>Cam kết đổi trả miễn phí</TypographyCus>
                        </Box>
                      </Box>
                      <Box className='col-span-7'>
                        <Box className='flex justify-start mb-5'>
                          <img src={moneyIcon} alt='' className='pr-2' />
                          <TypographyCus size={TEXTSIZE.size14}>Thanh toán khi nhận hàng</TypographyCus>
                        </Box>

                        <Box className='flex justify-start'>
                          <img src={securityIcon} alt='' className='pr-2' />
                          <TypographyCus size={TEXTSIZE.size14}>Hàng chính hãng/Bảo hành 10 năm</TypographyCus>
                        </Box>
                      </Box>
                    </Box>
                    <Box className='mt-8 flex items-center'>
                      <Box className='capitalize text-gray-500'>Số lượng</Box>
                      <QuantityController
                        onDecrease={handleBuyCount}
                        onIncrease={handleBuyCount}
                        onType={handleBuyCount}
                        value={buyCount}
                        max={product.quantity}
                      />
                      <Box className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có thể bán</Box>
                    </Box>
                    <Box className='mt-8 flex items-center'>
                      <button
                        onClick={handleClickAddToCart}
                        className='flex h-12 items-center justify-center rounded-md border border-[#a05139] bg-[#fff4f0] px-5 capitalize text-[#a05139] shadow-sm hover:bg-orange/5'
                      >
                        <svg
                          enableBackground='new 0 0 15 15'
                          viewBox='0 0 15 15'
                          x={0}
                          y={0}
                          className='mr-[10px] h-5 w-5 fill-current stroke-[#a05139] text-[#a05139]'
                        >
                          <g>
                            <g>
                              <polyline
                                fill='none'
                                points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit={10}
                              />
                              <circle cx={6} cy='13.5' r={1} stroke='none' />
                              <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                            </g>
                            <line
                              fill='none'
                              strokeLinecap='round'
                              strokeMiterlimit={10}
                              x1='7.5'
                              x2='10.5'
                              y1={7}
                              y2={7}
                            />
                            <line
                              fill='none'
                              strokeLinecap='round'
                              strokeMiterlimit={10}
                              x1={9}
                              x2={9}
                              y1='8.5'
                              y2='5.5'
                            />
                          </g>
                        </svg>
                        Thêm vào giỏ hàng
                      </button>
                      <button
                        onClick={buyNow}
                        className='ml-4 h-12 min-w-[5rem] items-center justify-center border rounded-md bg-[#ffb9a4] border-[#ffb9a4] text-[#a05139] px-5 capitalize shadow-sm outline-none hover:border-[#ffb9a4] hover:bg-[#fff4f0]'
                      >
                        Mua ngay
                      </button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className='mt-8'>
              <Box className='container'>
                <Box className='rounded pt-8 text-lg capitalize text-slate-700'>Mô tả sản phẩm</Box>
                <Box className='mx-4 mt-12 mb-4 text-sm leading-loose'>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description)
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
            padding: '0 10px'
          }}
        >
          <TypographyCus size={TEXTSIZE.size18} fontWeight='medium'>
            CÓ THỂ BẠN CŨNG THÍCH
          </TypographyCus>
        </Grid>
        <Grid item xs={11} sm={10} md={8}>
          <ListSlideProducts listVariants={listProductSuggestions} slidesPerView={4}></ListSlideProducts>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
