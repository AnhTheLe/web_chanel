import { useSelector } from 'react-redux';
import { SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function FacebookIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'>
      <g clipPath='url(#clip0_9_4607)'>
        <path
          d='M36 17.9996C35.9999 14.5592 35.0139 11.1908 33.1586 8.2935C31.3034 5.39618 28.6567 3.09123 25.5319 1.65162C22.4072 0.21201 18.9354 -0.301944 15.5276 0.170625C12.1198 0.643193 8.91877 2.08248 6.30368 4.31805C3.68859 6.55361 1.76896 9.49179 0.772122 12.7846C-0.224714 16.0775 -0.256996 19.587 0.679101 22.8976C1.6152 26.2082 3.48046 29.1812 6.05398 31.4645C8.6275 33.7478 11.8015 35.2457 15.2 35.7809V23.2129H10.6213V17.9996H15.192V14.0316C15.192 9.52223 17.88 7.0289 21.992 7.0289C23.3419 7.04778 24.6886 7.16543 26.0213 7.3809V11.8102H23.752C21.5147 11.8102 20.8187 13.1996 20.8187 14.6209V17.9996H25.8107L25.0107 23.2022H20.8133V35.7809C25.0469 35.1099 28.9022 32.9505 31.686 29.6911C34.4699 26.4316 35.9995 22.286 36 17.9996Z'
          fill='#FFB9A4'
        ></path>
        <path
          d='M25.0051 23.2133L25.8051 18.0106H20.8131V14.6213C20.8131 13.2 21.5091 11.8106 23.7464 11.8106H26.0158V7.3813C24.683 7.16583 23.3363 7.04818 21.9864 7.0293C17.8744 7.0293 15.1864 9.52263 15.1864 14.032V18H10.6211V23.2133H15.1918V35.792C17.056 36.0835 18.9542 36.0835 20.8184 35.792V23.2133H25.0051Z'
          fill='#FFECE1'
        ></path>
      </g>
      <defs>
        <clipPath id='clip0_9_4607'>
          <rect width='36' height='36' fill='white'></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export default FacebookIcon;
