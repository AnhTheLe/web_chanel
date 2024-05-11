import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import colors from '../../theme/statics/colors';

import { TextInputProps } from './TextInput';

export const useStyles = (props: TextInputProps) => {
  const primayColor = props.theme.current.color.textInput.primary ?? colors.primary[100];
  const borderColor = props.theme.current.color.ink[10] ?? colors.ink[10];
  const disabledColor = props.theme.current.color.text[50] ?? colors.text[50];
  const whiteBackground = props.theme.current.color.background.white ?? colors.ink[0];
  const bgrDisable = props.theme.current.color.textInput.bgrDisable ?? colors.ink[5];
  const disabled = props.disabled;
  const size = props.size ?? 'medium';
  const fontSize = props.fontSize ? props.fontSize : 14;
  const fontWeight = props.fontWeight ? props.fontWeight : '400';

  return makeStyles((theme: Theme) => {
    return {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          background: !disabled ? whiteBackground : bgrDisable
        },
        '& .MuiOutlinedInput-input': {
          textOverflow: 'ellipsis',
          fontSize: fontSize,
          fontWeight: fontWeight,
          height: size === 'medium' ? 24 : 20,
          caretColor: primayColor,
          padding: size === 'medium' ? 12 : '10px 12px'
        },
        '& .MuiOutlinedInput-input::placeholder': {
          color: disabledColor,
          opacity: 1
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: borderColor
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
          borderColor: primayColor
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: !disabled ? primayColor : borderColor
        },
        '& .MuiFormHelperText-contained': {
          marginLeft: 0,
          marginTop: 0
        }
      },
      label: {
        maxWidth: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        marginBottom: 4
      },
      labelText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    };
  });
};
