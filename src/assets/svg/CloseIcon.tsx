import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import { SvgIcon, SvgIconProps } from '@mui/material';

function CloseIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <SvgIcon {...props} width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8 8L24 24M24 8L8 24'
        stroke={props.htmlColor ?? theme.current.color.icon.primary}
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </SvgIcon>
  );
}

export default CloseIcon;
