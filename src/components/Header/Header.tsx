import { Box, Grid, Icon, IconButton, Typography } from '@mui/material';
import { Root, NavButton } from './Header.style';
import logo from 'src/assets/img/logo.png';
import SearchIcon from 'src/assets/svg/SearchIcon';
import UserIcon from 'src/assets/svg/UserIcon';
import CartIcon from 'src/assets/svg/CartIcon';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popover from '../Popover';
import ArrowLeftDoubleIcon from 'src/assets/svg/ArrowLeftDoubleIcon';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
              <div className=' bg-white relative shadow-md rounded-sm border border-gray-200'>
                <div className='flex flex-col justify-start py-2 px-2 pr-4 pl-3'>
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
                </div>
              </div>
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

          <IconButton>
            <CartIcon></CartIcon>
          </IconButton>
        </Grid>
      </Grid>
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
          <Typography sx={{ paddingLeft: '8px', color: '#bf664e' }}>Đăng nhập tài khoản</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
