import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function UserIcon(props: SvgIconProps) {
  const { htmlColor, ...customProps } = props;
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg
      {...customProps}
      width={props.width ?? 33}
      height={props.height ?? 32}
      viewBox='0 0 33 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.3029 15.682C19.5288 15.682 22.1439 13.0669 22.1439 9.841C22.1439 6.61511 19.5288 4 16.3029 4C13.077 4 10.4619 6.61511 10.4619 9.841C10.4619 13.0669 13.077 15.682 16.3029 15.682Z'
        fill={htmlColor ?? theme.current.color.icon.primary}
      />
      <path
        d='M16.32 16.9038C11.9518 16.9038 8.23627 19.6821 6.86389 23.5816C6.09401 25.7406 7.75092 28 10.0438 28H22.6128C24.9057 28 26.5626 25.7406 25.7928 23.5816C24.3869 19.6821 20.6882 16.9038 16.32 16.9038Z'
        fill={htmlColor ?? theme.current.color.icon.primary}
      />
    </svg>
  );
}

export default UserIcon;
