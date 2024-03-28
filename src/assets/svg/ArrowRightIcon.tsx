import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function ArrowRightIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 6L15 12L9 18'
        stroke={props.htmlColor ?? theme.current.color.icon.primary}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default ArrowRightIcon;
