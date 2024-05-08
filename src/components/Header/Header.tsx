import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Root, NavButton } from './Header.style';
import logo from 'src/assets/img/logo.png';
import SearchIcon from 'src/assets/svg/SearchIcon';
import UserIcon from 'src/assets/svg/UserIcon';
import CartIcon from 'src/assets/svg/CartIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Popover from '../Popover';
import ArrowLeftDoubleIcon from 'src/assets/svg/ArrowLeftDoubleIcon';
import { AppContext } from 'src/contexts/app.context';
import purchaseApi from 'src/api/shoppingCart.api';
import { useQuery } from '@tanstack/react-query';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import noproduct from 'src/assets/img/no-product.png';

const MAX_PURCHASES = 10;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { isAuthenticated } = useContext(AppContext);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const url = window.location.href.replace(window.location.origin, '');

  const getHeaderTitle = () => {
    switch (url) {
      case '/account/login':
        return 'Đăng nhập tài khoản';
      case '/account/sign-up':
        return 'Đăng ký';
      default:
        return 'Đăng nhập';
    }
  };

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: purchaseApi.getPurchases,
    enabled: isAuthenticated
  });

  const purchasesInCart = purchasesInCartData?.data.data;

  useEffect(() => {
    refetch;
  }, [purchasesInCartData, refetch]);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid
        item
        xs={12}
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{
          borderBottom: 'solid thin #E5E5E5'
        }}
      >
        <Grid item xs={2}>
          <img src={logo} alt='' />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          justifyContent={'center'}
        >
          <NavButton
            variant='text'
            size='large'
            disableRipple
            onClick={() => {
              navigate('/home');
            }}
          >
            TRANG CHỦ
          </NavButton>
          <NavButton
            variant='text'
            disableRipple
            onClick={() => {
              navigate('/products');
            }}
          >
            SẢN PHẨM
          </NavButton>
          <NavButton
            variant='text'
            disableRipple
            onClick={() => {
              navigate('/blogs');
            }}
          >
            BLOG
          </NavButton>
          <NavButton variant='text' disableRipple>
            GIỚI THIỆU
          </NavButton>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          justifyContent={'flex-end'}
        >
          <IconButton
            sx={{
              '&:hover': {
                color: '#ffb9a4'
              }
            }}
          >
            <SearchIcon />
          </IconButton>
          <Popover
            className='flex items-center py-1 text-white hover:text-gray-300 cursor-pointer relative'
            renderPopover={
              <Box className=' bg-white relative shadow-md rounded-sm border border-gray-200'>
                {isAuthenticated ? (
                  <Box className='flex flex-col justify-start py-2 px-2 pr-4 pl-3'>
                    <NavButton
                      variant='text'
                      disableRipple
                      onClick={() => {
                        navigate('/user');
                      }}
                      sx={{ fontSize: 14 }}
                    >
                      Tài khoản
                    </NavButton>
                  </Box>
                ) : (
                  <Box className='flex flex-col justify-start py-2 px-2 pr-4 pl-3'>
                    <NavButton
                      variant='text'
                      disableRipple
                      onClick={() => {
                        navigate('/account/login');
                      }}
                      sx={{ fontSize: 14 }}
                    >
                      Đăng nhập
                    </NavButton>
                    <NavButton
                      variant='text'
                      disableRipple
                      sx={{ fontSize: 14 }}
                      onClick={() => {
                        navigate('/account/sign-in');
                      }}
                    >
                      Đăng ký
                    </NavButton>
                  </Box>
                )}
              </Box>
            }
          >
            <IconButton
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpen}
              onClick={open ? handlePopoverClose : handlePopoverOpen}
            >
              <UserIcon
                sx={{
                  '&:hover svg': {
                    fill: '#ffb9a4'
                  }
                }}
              ></UserIcon>
            </IconButton>
          </Popover>

          <Box className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <Box className='relative  max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md py-2'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <Box className='p-2'>
                      <Box className='capitalize text-gray-400'>Sản phẩm mới thêm</Box>
                      <Box className='mt-5 mb-4'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <Box className='mt-2 flex py-2 hover:bg-gray-100' key={purchase.variant.id}>
                            <Box className='flex-shrink-0'>
                              <img
                                src={purchase.variant.image}
                                alt={purchase.variant.image}
                                className='h-11 w-11 object-cover'
                              />
                            </Box>
                            <Box className='ml-2 flex-grow overflow-hidden'>
                              <Box className='truncate'>{purchase.variant.name}</Box>
                            </Box>
                            <Box className='ml-2 flex-shrink-0'>
                              <span className='text-orange'>
                                {formatPriceWithVNDCurrency(purchase.variant.discountedPrice)}
                              </span>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Link
                        to={'/cart'}
                        className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                      >
                        Xem giỏ hàng
                      </Link>
                    </Box>
                  ) : (
                    <Box className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <Box className='mt-3 capitalize'>Chưa có sản phẩm</Box>
                    </Box>
                  )}
                </Box>
              }
            >
              <Link to='/cart' className='relative'>
                <IconButton>
                  <CartIcon></CartIcon>
                </IconButton>
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute top-[-10px] left-[24px] rounded-full bg-orange px-[6px] py-[1px] text-xs text-white '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </Box>
        </Grid>
      </Grid>
      {url !== '' && url !== '/home' && (
        <Grid container item xs={12} sx={{ background: '#ffece1', padding: '12px 0' }} justifyContent={'center'}>
          <Grid
            item
            xs={8}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            // paddingLeft={'calc(16%)'}
          >
            <Typography sx={{ paddingRight: '8px', '&:hover': { color: '#bf664e', cursor: 'pointer' } }}>
              Trang chủ
            </Typography>
            <ArrowLeftDoubleIcon></ArrowLeftDoubleIcon>
            <Typography sx={{ paddingLeft: '8px', color: '#bf664e' }}>{getHeaderTitle()}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
