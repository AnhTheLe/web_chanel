import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function YoutubeIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'>
      <g clipPath='url(#clip0_9_4620)'>
        <path
          d='M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z'
          fill='#FFB9A4'
        ></path>
        <path
          d='M29.4986 12.2237C29.3619 11.712 29.0927 11.2453 28.7181 10.8708C28.3436 10.4963 27.877 10.2271 27.3653 10.0903C25.5039 9.61035 17.9999 9.61035 17.9999 9.61035C17.9999 9.61035 10.4959 9.61035 8.62393 10.1117C8.11221 10.2484 7.64558 10.5176 7.27104 10.8921C6.89651 11.2667 6.62732 11.7333 6.49059 12.245C5.98926 14.1117 5.98926 18.021 5.98926 18.021C5.98926 18.021 5.98926 21.9277 6.49059 23.7997C6.62862 24.3093 6.89847 24.7736 7.27298 25.1457C7.64749 25.5179 8.11345 25.7848 8.62393 25.9197C10.4959 26.4103 17.9999 26.4103 17.9999 26.4103C17.9999 26.4103 25.5039 26.4103 27.3759 25.909C27.8864 25.7742 28.3523 25.5072 28.7269 25.1351C29.1014 24.7629 29.3712 24.2986 29.5092 23.789C30.0106 21.9224 30.0106 18.0103 30.0106 18.0103C30.0106 18.0103 29.9999 14.0957 29.4986 12.2237ZM15.5999 21.6103V14.4104L21.8346 18.0103L15.5999 21.6103Z'
          fill='white'
        ></path>
      </g>
      <defs>
        <clipPath id='clip0_9_4620'>
          <rect width='36' height='36' fill='white'></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export default YoutubeIcon;
