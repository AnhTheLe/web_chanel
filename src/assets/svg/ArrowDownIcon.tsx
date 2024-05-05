import { useSelector } from 'react-redux';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function ArrowDownIcon(props: SvgIconProps & { shouldRotate?: boolean }) {
  const theme = useSelector((state: AppState) => state.theme);
  const iconStyle = {
    transform: props.shouldRotate ? 'rotateX(180deg)' : 'none',
    transition: 'transform 0.3s ease-in-out',
    // Giữ nguyên các style khác của props
    ...props.style
  };

  return (
    <svg
      style={iconStyle}
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 9L12 15L18 9'
        stroke={props.htmlColor ?? theme.current.color.icon.primary}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default ArrowDownIcon;
