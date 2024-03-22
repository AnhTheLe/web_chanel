import { Box, Grid, Icon, IconButton } from '@mui/material';
import { Root, NavButton } from './Header.style';
import logo from 'src/assets/img/logo.png';
import SearchIcon from 'src/assets/svg/SearchIcon';
import UserIcon from 'src/assets/svg/UserIcon';
import CartIcon from 'src/assets/svg/CartIcon';

export default function Header() {
  return (
    <Grid
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
      <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} justifyContent={'center'}>
        <NavButton variant='text' size='large' disableRipple>
          TRANG CHỦ
        </NavButton>
        <NavButton variant='text' disableRipple>
          SẢN PHẨM
        </NavButton>
        <NavButton variant='text' disableRipple>
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
        <IconButton>
          <UserIcon
            sx={{
              '&:hover svg': {
                fill: '#ffb9a4'
              }
            }}
          ></UserIcon>
        </IconButton>
        <IconButton>
          <CartIcon></CartIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
}
