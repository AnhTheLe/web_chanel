import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import { SvgIcon, SvgIconProps } from '@mui/material';

function CommentIcon(props: SvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0,0,256,256'>
      <g
        fill='#707070'
        fillRule='nonzero'
        stroke='none'
        strokeWidth='1'
        strokeLinecap='butt'
        strokeLinejoin='miter'
        strokeMiterlimit='10'
        strokeDasharray=''
        strokeDashoffset='0'
        fontFamily='none'
        fontWeight='none'
        fontSize='none'
        textAnchor='none'
      >
        <g transform='scale(5.33333,5.33333)'>
          <path d='M37,39h-26l-6,6v-34c0,-3.3 2.7,-6 6,-6h26c3.3,0 6,2.7 6,6v22c0,3.3 -2.7,6 -6,6z'></path>
        </g>
      </g>
    </svg>
  );
}

export default CommentIcon;
