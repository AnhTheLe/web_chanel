import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function CheckedIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);
  const checkedColor = theme.current.color.primary[100];

  return (
    <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width={20} height={20} rx={6} fill={checkedColor} />
      <path
        d='M15.5 6.50031L8.5 13.5L5 10.0003'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default CheckedIcon;
