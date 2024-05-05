import React, { memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Checkbox, CheckboxProps } from '@mui/material';

import { AppState } from "../../store";
import UnCheckedIcon from "src/assets/svg/UnCheckedIcon";
import CheckedIcon from "src/assets/svg/CheckedIcon";

interface PosCheckboxProps extends PropsFromRedux, CheckboxProps {
  style?: any;
  id?: string;
}
const PosCheckBox = React.forwardRef(function PosCheckBox(props: PosCheckboxProps, ref: any) {
  return (
    <Checkbox
      id={props.id}
      ref={ref}
      onChange={props.onChange}
      icon={<UnCheckedIcon disabled={props.disabled} />}
      checkedIcon={<CheckedIcon />}
      checked={props.checked}
      disabled={props.disabled}
      style={props.style}
    />
  );
});
PosCheckBox.displayName = 'PosCheckBox';

const mapStateToProps = (state: AppState) => ({
  theme: state.theme,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default memo(connector(PosCheckBox));
