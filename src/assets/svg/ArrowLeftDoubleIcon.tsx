import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function ArrowLeftDoubleIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='14' height='13' viewBox='0 0 14 13' fill='none'>
      {' '}
      <path
        d='M13.4246 6.50003L7.41421 12.5104L6 11.0962L10.5962 6.50003L6 1.90384L7.41422 0.489624L13.4246 6.50003Z'
        fill='#8C8C8C'
      ></path>{' '}
      <path
        d='M8 6.50003L1.98959 12.5104L0.575378 11.0962L5.17157 6.50003L0.57538 1.90384L1.98959 0.489624L8 6.50003Z'
        fill='#8C8C8C'
      ></path>{' '}
    </svg>
  );
}

export default ArrowLeftDoubleIcon;
