import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import { SvgIconProps } from '@mui/material';

function LoadingIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg {...props} width='21' height='19' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.86706 7.45592C2.28544 6.03622 3.04748 4.74162 4.0857 3.68678C5.12391 2.63194 6.40625 1.84943 7.81912 1.40856C9.23199 0.967684 10.7318 0.882059 12.1857 1.15927C13.6395 1.43647 15.0026 2.06796 16.1541 2.99778C17.3056 3.92761 18.2101 5.12707 18.7873 6.48992C19.3645 7.85278 19.5968 9.33696 19.4634 10.811C19.33 12.285 18.8352 13.7034 18.0227 14.9405C17.2102 16.1777 16.1052 17.1953 14.8055 17.9033'
        stroke={props.fill ?? theme.current.color.icon.primary}
        strokeWidth='2'
        strokeMiterlimit='1.41421'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default LoadingIcon;
