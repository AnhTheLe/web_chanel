import { Button } from '@mui/material';
import { makeStyles, styled } from '@mui/material/styles';

export const Root = styled('header')(({ theme }) => ({}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: '#333333',
  fontSize: '16px',
  textAlign: 'left',
  '&:hover': {
    color: '#bf664e',
    backgroundColor: 'transparent'
  }
}));
