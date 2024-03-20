import { ColorVariantModel, InkColorModel } from '@mui/material/styles/createPalette';

const brand = '#2A7BEE';

const ink: InkColorModel = {
  100: '#0F1824',
  90: '#46515F',
  80: '#444B55',
  70: '#5F656D',
  60: '#83878D',
  50: '#94989E',
  40: '#A6A9AE',
  30: '#B8BBBE',
  20: '#CACCCE',
  10: '#DBDDDF',
  5: '#EDEEEF',
  0: '#FFF'
};

// 110: "#1A6BDC",
//   100: "#2A7BEE ",
//   80: "#458CF0",
//   60: "#5F9CF2",
//   50: "#7AADF4 ",
//   40: "#95BDF7",
//   20: "#AFCEF9",
//   10: "#CADEFB",
//   5: "#E4EFFD",

const primary: ColorVariantModel = {
  110: '#007DEB',
  100: '#0088FF',
  80: '#2097FF',
  60: '#40A6FF',
  50: '#60B5FF',
  40: '#80C3FF',
  20: '#9FD2FF',
  10: '#BFE1FF',
  5: '#DFF0FF',
  gradient: {
    from: '#0088FF',
    to: '#0071D4'
  }
};

const secondary: ColorVariantModel = {
  110: '#0EC67F',
  100: '#0FD186',
  80: '#3FDA9E',
  60: '#6FE3B6',
  50: '#9FEDCF',
  40: '#CFF6E7',
  20: '#DBF8ED',
  10: '#E6F8F1',
  5: '#EDFCF7',
  gradient: {
    from: '#0FD186',
    to: '#3FDA9E'
  }
};

const yellow: ColorVariantModel = {
  110: '#EDA000',
  100: '#FFAE06',
  80: '#FFBE38',
  60: '#FFCE6A',
  50: '#FFDF9B',
  40: '#FFEFCD',
  20: '#FFF3DA',
  10: '#FFF7E7',
  5: '#FFFBF2',
  gradient: {
    from: '#FFAE06',
    to: '#FFBE38'
  }
};

const red: ColorVariantModel = {
  110: '#E83232',
  100: '#EB4444',
  80: '#ED5B5B',
  60: '#F07373',
  50: '#F38A8A',
  40: '#F5A2A2',
  20: '#F8B9B9',
  10: '#FAD0D0',
  5: '#FDE8E8',
  gradient: {
    from: '#F02727',
    to: '#CB2626'
  }
};

const text = {
  100: '#2A323C',
  90: '#46515F',
  70: '#636C77',
  50: '#94989E',
  0: '#FFFFFF'
};

const background = {
  white: '#FFF',
  main: '#F4F5F5',
  blur: '#F4F5F5'
};

const icon = {
  primary: '#46515F',
  secondary: '#A3A8AF'
};

const notifyText = {
  danger: '#EE4747',
  warning: '#E49C06',
  success: '#0DB473',
  info: '#5364FE'
};

const colors = {
  brand,
  ink,
  primary,
  secondary,
  yellow,
  red,
  text,
  background,
  icon,
  notifyText
};

export default colors;
