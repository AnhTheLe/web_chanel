import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
  Theme
} from '@mui/material';
import { isEmpty } from 'lodash';

import { makeStyles } from '@mui/styles';

import { AppState } from '../../store';
import PosCheckbox from '../checkbox/PosCheckbox';
import TypographyCus, { TEXTSIZE } from '../PosTypography/TypographyCus';
import ArrowDropDownIcon from 'src/assets/svg/ArrowDropDownIcon';

interface DropdownProps<T, M extends boolean = false> extends Omit<MuiSelectProps, 'onChange' | 'renderValue'> {
  value?: M extends true ? T[] : T;
  items: T[];
  multiple?: M;
  subPlaceholder?: string;
  size?: 'medium' | 'small';
  maxWidth?: string | number;
  fullWidth?: boolean;
  renderLabel?: (item: T) => string;
  idForItem: (item: T) => string | number;
  onChange?: (item: M extends true ? T[] : T) => void;
  renderValue?: (value: M extends true ? T[] : T) => React.ReactNode;
  selectAllOption?: M extends true ? true | false : false | undefined;
}

const Dropdown = <T, M extends boolean = false>(props: DropdownProps<T, M>) => {
  const {
    value,
    items,
    onChange,
    multiple,
    label,
    placeholder,
    subPlaceholder,
    size = 'medium',
    maxWidth,
    fullWidth,
    idForItem,
    renderLabel,
    renderValue,
    selectAllOption
  } = props;
  const classes = useStyles({ size, emptyValue: isEmpty(value) });
  const [isSelectAll, setIsSelectAll] = React.useState<boolean>(false);
  const theme = useSelector((state: AppState) => state.theme);

  const checkIsSelectAll = (value: T[], items: T[]) => {
    if (value.length !== items.length) return false;

    const idSet1 = new Set(value.map((item) => idForItem(item)));
    const idSet2 = new Set(items.map((item) => idForItem(item)));

    for (const id of idSet1) {
      if (!idSet2.has(id)) {
        return false;
      }
    }

    return true;
  };

  const handleChange = (event: SelectChangeEvent<NonNullable<M extends true ? T[] : T> | never[]>) => {
    const selectedValue = event.target.value as NonNullable<M extends true ? T[] : T> | never[];

    if (multiple && Array.isArray(selectedValue)) {
      const selectedItems = items.filter((item) => selectedValue.includes(idForItem(item) as never));
      onChange?.(selectedItems as M extends true ? T[] : T);
      setIsSelectAll(checkIsSelectAll(selectedItems, items));
    } else {
      const selectedItem = items.find((item) => idForItem(item) === selectedValue);
      if (selectedItem) onChange?.(selectedItem as M extends true ? T[] : T);
    }
  };

  const handleSelectAll = () => {
    if (multiple) {
      if (isSelectAll) {
        onChange?.([] as any);
        setIsSelectAll(false);
      } else {
        onChange?.(items as any);
        setIsSelectAll(true);
      }
    }
  };

  const isChecked = (item: T) => {
    if (multiple && Array.isArray(value)) {
      return Array.isArray(value) && value.includes(idForItem(item));
    }
    return idForItem(value as any) === idForItem(item);
  };

  const handleRenderValue = (value: any) => {
    if (!isEmpty(value)) {
      if (!renderValue) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            if (value.length === 1) {
              return value[0];
            } else {
              return `${value.length} ${subPlaceholder}`;
            }
          } else {
            return placeholder;
          }
        } else {
          return placeholder;
        }
      } else {
        return renderValue(value);
      }
    } else {
      return placeholder;
    }
  };

  return (
    <FormControl className={classes.formControl} variant='outlined' fullWidth={fullWidth}>
      {label && <InputLabel htmlFor='age-native-simple'>{label}</InputLabel>}
      <MuiSelect
        displayEmpty
        value={value ? value : multiple ? [] : ''}
        multiple={multiple}
        onChange={handleChange}
        classes={{ outlined: classes.selectOutlined }}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'right' },
          classes: { list: classes.menuList },
          autoFocus: false
        }}
        IconComponent={ArrowDropDownIcon}
        renderValue={(value: any) => {
          return handleRenderValue(value);
        }}
      >
        <MenuItem value={''}>{placeholder}</MenuItem>
        {selectAllOption && items.length !== 0 && (
          <MenuItem value={'Chọn tất cả'} key={'Chọn tất cả'} classes={{ root: classes.menuItem }}>
            <FormControlLabel
              label='Chọn tất cả'
              control={<PosCheckbox checked={isSelectAll} onChange={handleSelectAll} />}
              style={{ width: '100%', marginLeft: '0px' }}
            />
          </MenuItem>
        )}
        {items &&
          items.length > 0 &&
          items.map((i) => (
            <MenuItem
              value={idForItem(i)}
              key={String(idForItem(i))}
              classes={{ root: classes.menuItem }}
              onClick={() => isChecked(i)}
            >
              {multiple && <PosCheckbox checked={isChecked(i)} />}
              <Box>
                <TypographyCus
                  size={TEXTSIZE.size14}
                  fontWeight={'regular'}
                  textColor={theme.current.color.text[100]}
                  style={{ maxWidth: maxWidth ? maxWidth : 170 }}
                  noWrap={false}
                  ellipsis={2}
                  className={classes.truncateTwoLine}
                >
                  {renderLabel?.(i) || String(i)}
                </TypographyCus>
              </Box>
            </MenuItem>
          ))}
      </MuiSelect>
    </FormControl>
  );
};

const useStyles = makeStyles<Theme, { size: 'medium' | 'small'; emptyValue: boolean }>((theme: Theme) => ({
  formControl: ({ emptyValue }) => ({
    '& .MuiInputLabel-outlined': {
      transform: 'none',
      fontSize: '14px',
      position: 'unset',
      color: emptyValue ? '#636C77' : '#636C77',
      lineHeight: '20px',
      marginBottom: '4px'
    },
    '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DBDDDF',
      borderRadius: '8px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: '#2A7BEE'
    },
    '& .MuiSelect-icon path': {
      fill: '#79808A'
    },
    '& .MuiSelect-select.Mui-disabled': {
      backgroundColor: '#EDEEEF'
    }
  }),
  selectOutlined: ({ size }) => ({
    padding: size === 'medium' ? '14px' : '10px',
    fontSize: '14px',
    lineHeight: '20px'
  }),
  selectOutlinedSearch: ({ size }) => ({
    padding: size === 'medium' ? '14px' : '10px',
    fontSize: '14px',
    lineHeight: '20px',

    '& .MuiSelect-outlined': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  }),
  menuList: {
    borderRadius: 8,
    width: '100%',
    maxHeight: 200,
    overflow: 'auto',
    wordBreak: 'break-word',
    paddingTop: 0,
    '&::-webkit-scrollbar': {
      width: 4,
      height: 4
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.customColors.ink[10]}`,
      borderRadius: 12,
      '&:hover': {
        backgroundColor: `${theme.palette.customColors.ink[20]}`
      }
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: 12
    },
    '& .ps__rail-y, ps__rail-x': {
      opacity: 0.6
    },
    // "& .MuiListItem-root, "
    '& .MuiListItem-root:first-child': {
      display: 'none'
    },
    '& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
      backgroundColor: '#E4EFFD'
    }
  },
  paper: {
    marginTop: 4
  },
  menuItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px',
    lineHeight: '20px',
    whiteSpace: 'normal',
    // "&:not(:last-child)": {
    //   borderBottom: "1px solid #DBDDDF",
    // },
    '& .MuiCheckbox-root': {
      padding: 0,
      marginRight: '5px'
    }
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: ' ellipsis'
  },
  truncateTwoLine: {
    overflow: 'hidden',
    textOverflow: ' ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    lineClamp: 2,
    WebkitBoxOrient: 'vertical'
    // -webkit-line-clamp: 2, /* number of lines to show */
    //         line-clamp: 2,
    // -webkit-box-orient: vertical,
  }
}));

export default Dropdown;
