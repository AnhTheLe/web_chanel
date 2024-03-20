import { Button } from '@mui/material';
import { makeStyles, styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '64px'
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: '#333333',
  fontSize: '16px',
  '&:hover': {
    color: '#faa58b',
    backgroundColor: 'transparent'
  }
}));
