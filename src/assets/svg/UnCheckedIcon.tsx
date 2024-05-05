import { connect, ConnectedProps, useSelector } from 'react-redux';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { AppState } from '../../store';
import colors from '../../theme/statics/colors';

interface PosSvgIconProps extends SvgIconProps {
  disabled?: boolean;
}

function UnCheckedIcon(props: PosSvgIconProps) {
  const theme = useSelector((state: AppState) => state.theme);

  const unCheckedColor = theme.current.color.checkbox.unChecked ?? colors.ink[30];
  const disableColor = theme.current.color.checkbox.disable ?? colors.ink[5];

  return (
    <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        rx={5}
        fill='white'
        stroke={props.disabled ? disableColor : unCheckedColor}
        strokeWidth={2}
      />
    </svg>
  );
}

export default UnCheckedIcon;
