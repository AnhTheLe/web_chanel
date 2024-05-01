import { useSelector } from 'react-redux';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { AppState } from '../../store';

function SuccessIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <SvgIcon
      {...props}
      aria-hidden='true'
      focusable='false'
      data-prefix='fal'
      data-icon='check-circle'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      className='svg-inline--fa fa-check-circle fa-w-16'
    >
      <path
        fill='currentColor'
        d='M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z'
        className=''
      ></path>
    </SvgIcon>
  );
}

export default SuccessIcon;
