import { styled } from '@mui/material';

export const Img = styled('img')(({ theme }) => ({
  verticalAlign: 'middle',
  borderStyle: 'none',
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover'
}));
