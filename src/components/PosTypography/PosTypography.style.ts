import { Box, Typography, styled } from '@mui/material';
import { PosTypographyProps } from './TypographyCus';

const PREFIX = 'Pos-Typography';
export const classes = {
  ellipsis: `${PREFIX}-root`
};

export const PosTypography = styled(Typography)((props: PosTypographyProps) => ({
  // Remove empty object pattern
  [`&.${classes.ellipsis}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: props.ellipsis,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box'
  }
}));
