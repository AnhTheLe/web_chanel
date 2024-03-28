import { Grid, Link, styled } from '@mui/material';

export const LinkFooter = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.5s',
  marginRight: '24px',
  '&:hover svg': {
    transform: 'rotate(30deg)'
  }
}));

export const GridItemFooter = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: '16px',
  '&:hover': {
    color: '#bf664e',
    cursor: 'pointer'
  }
}));
