/* eslint-disable react/prop-types */
import React, { memo, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, TextField, TextFieldProps } from '@mui/material';
import clsx from 'clsx';

import { AppState } from '../../store';

import { useStyles } from './TextInput.style';
import TypographyCus, { TypographySize } from '../PosTypography/TypographyCus';

export type TextInputProps = TextFieldProps &
  PropsFromRedux & {
    width?: number | string;
    textLabel?: string;
    labelIcon?: ReactNode;
    labelColor?: string;
    label?: string;
    lablelTextSize?: TypographySize;
    subLabel?: string;
    tooltip?: string;
    fontSize?: number;
    fontWeight?: string;
    maxLength?: number;
  };
// nào có hứng thì làm debounceTimeout
const TextInput = memo(
  React.forwardRef((props: TextInputProps, ref) => {
    const classes = useStyles(props)();
    const { width, textLabel, labelIcon, labelColor, lablelTextSize, ...textFieldProps } = props;

    delete (textFieldProps as any).dispatch;

    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: width ?? 200
        }}
      >
        {textLabel && (
          <Box className={classes.label}>
            {labelIcon}
            {
              <TypographyCus textColor={labelColor} size={lablelTextSize} className={classes.labelText}>
                {textLabel}
              </TypographyCus>
            }
          </Box>
        )}
        <TextField
          {...textFieldProps}
          variant={props.variant ?? 'outlined'}
          className={clsx(classes.root, props.className)}
          inputProps={{ maxLength: props.maxLength }}
        />
      </Box>
    );
  })
);

const mapStateToProps = (state: AppState) => ({
  theme: state.theme
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(TextInput);
