import { Box, IconButton } from '@mui/material';
import { Root, NavButton } from './Header.style';
import logo from 'src/assets/img/logo.png';
import SearchIcon from 'src/assets/svg/SearchIcon';
import UserIcon from 'src/assets/svg/UserIcon';

export default function Header() {
  return (
    <Root>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src={logo} alt='' />
        <NavButton variant='text' size='large' disableRipple>
          TRANG CHỦ
        </NavButton>
        <NavButton variant='text'>SẢN PHẨM</NavButton>
        <NavButton variant='text'>BLOG</NavButton>
        <NavButton variant='text'>GIỚI THIỆU</NavButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
      </Box>
    </Root>
  );
}
