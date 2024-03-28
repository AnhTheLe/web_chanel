import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function ArrowLeftIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15 6L9 12L15 18'
        stroke={props.htmlColor ?? theme.current.color.icon.primary}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default ArrowLeftIcon;
