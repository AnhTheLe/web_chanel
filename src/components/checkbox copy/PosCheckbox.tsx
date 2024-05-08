
import UnCheckedIcon from 'src/assets/svg/UnCheckedIcon';
import CheckedIcon from 'src/assets/svg/CheckedIcon';
import { Checkbox, CheckboxProps } from '@mui/material';

interface PosCheckboxProps extends CheckboxProps {
  style?: any;
  id?: string;
}
const PosCheckBox = (props: PosCheckboxProps, ref: any) => {
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
};

export default PosCheckBox;
