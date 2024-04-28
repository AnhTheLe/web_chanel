import { memo } from 'react';
import clsx from 'clsx';

import { PosTypography, classes } from './PosTypography.style';
import { Typography, TypographyProps } from '@mui/material';

export const TEXTSIZE = {
  size10: {
    fontSize: 10,
    lineHeight: '16px'
  },
  size12: {
    fontSize: 12,
    lineHeight: '18px'
  },
  size14: {
    fontSize: 14,
    lineHeight: '22px'
  },
  size16: {
    fontSize: 16,
    lineHeight: '24px'
  },
  size18: {
    fontSize: 18,
    lineHeight: '26px'
  },
  size20: {
    fontSize: 20,
    lineHeight: '28px'
  },
  size22: {
    fontSize: 22,
    lineHeight: '30px'
  },
  size24: {
    fontSize: 24,
    lineHeight: '32px'
  },
  size26: {
    fontSize: 26,
    lineHeight: '34px'
  },
  size28: {
    fontSize: 28,
    lineHeight: '36px'
  },
  size30: {
    fontSize: 30,
    lineHeight: '38px'
  },
  size32: {
    fontSize: 32,
    lineHeight: '40px'
  },
  size50: {
    fontSize: 50,
    lineHeight: '40px'
  }
};

export interface TypographySize {
  fontSize: number;
  lineHeight: string;
}

export interface PosTypographyProps extends TypographyProps {
  fontWeight?: 'regular' | 'medium' | 'bold';
  size?: TypographySize;
  children: React.ReactNode | React.ReactNode[];
  textColor?: string;
  ellipsis?: number;
  component?: React.ElementType<any>;
}

const getFontWeight = (fontWeight?: string) => {
  if (!fontWeight) {
    return 400;
  } else {
    switch (fontWeight) {
      case 'regular':
        return 400;
      case 'medium':
        return 550;
      case 'bold':
        return 700;
      default:
        return '';
    }
  }
};

const TypographyCus = (props: PosTypographyProps) => {
  const { size, style, children, textColor, fontWeight, className, ellipsis, component = 'span', ...typoProps } = props;

  delete (typoProps as any).dispatch;
  delete (typoProps as any).theme;
  delete (typoProps as any).htmlColor;

  return (
    <PosTypography
      {...typoProps}
      component={component as any}
      style={{
        ...style,
        fontSize: size ? size.fontSize : '16px',
        lineHeight: size ? size.lineHeight : '24px',
        fontWeight: getFontWeight(fontWeight),
        color: textColor ?? '#333333'
      }}
      className={clsx(className, ellipsis ? classes.ellipsis : '')}
    >
      {children}
    </PosTypography>
  );
};

export default memo(TypographyCus);
