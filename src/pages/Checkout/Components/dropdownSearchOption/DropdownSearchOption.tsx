import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ClickAwayListener, SelectProps as MuiSelectProps } from '@mui/material';
import clsx from 'clsx';

import useStyles from './DropdownSearchOption.style';
import PosCheckbox from 'src/components/checkbox/PosCheckbox';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import ArrowDropDownIcon from 'src/assets/svg/ArrowDropDownIcon';
import DefaultLoadingIcon from 'src/utils/DefaultLoadingIcon';
import { AppState } from 'src/store';
import colors from 'src/theme/statics/colors';

export interface SearchSuggestProps<T, M extends boolean = false>
  extends Omit<MuiSelectProps, 'onChange' | 'renderValue'> {
  value: M extends true ? T[] : T;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
  placeholder?: string;
  title?: string;
  options: T[];
  multiple?: M;
  renderOption: (option: T) => ReactNode;
  onChange: (item: M extends true ? T[] : T) => void;
  renderValue?: (value: M extends true ? T[] : T) => React.ReactNode;
  renderSearchInput?: () => React.ReactNode;
  maxHeightListOption?: number;
  loading?: boolean;
  idForItem: (item: T) => string | number;
  uniqKey?: string;
  hasSearch?: boolean;
  inputVariant?: 'outlined' | 'standard';
  infiniteScroll?: boolean;
  maxOptions?: number;
  onScroll?: () => void;
  currentPage?: number;
  disabled?: boolean;
  error?: boolean;
}

const DropdownSearchOption = <T, M extends boolean = false>(props: SearchSuggestProps<T, M>) => {
  const classes = useStyles();
  const {
    onClose,
    onOpen,
    placeholder,
    title,
    options,
    renderOption,
    value,
    open,
    onChange,
    maxHeightListOption = 300,
    renderSearchInput,
    loading,
    renderValue,
    idForItem,
    multiple,
    uniqKey,
    inputVariant = 'outlined',
    hasSearch = true,
    infiniteScroll,
    onScroll,
    currentPage,
    maxOptions,
    disabled,
    error
  } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const theme = useSelector((state: AppState) => state.theme);

  useEffect(() => {
    setInputValue('');
  }, [open]);

  const handleClickAway = () => {
    onClose?.();
  };

  const isChecked = (item: T) => {
    if (multiple && Array.isArray(value)) {
      return Array.isArray(value) && value.includes(idForItem(item));
    }
    return idForItem(value as any) === idForItem(item);
  };
  const renderListOption = () => {
    return (
      <>
        {options &&
          options.map((item, index) => {
            return (
              <Box
                key={index}
                className={clsx('menuItem', isChecked(item) ? 'selected-item' : '')}
                key-event='true'
                onClick={() => handleSelectItem(item)}
                data-id={uniqKey ? String((item as any)[uniqKey]) : index}
              >
                {multiple && <PosCheckbox checked={isChecked(item)} />}
                <Box marginLeft={!multiple ? '12px' : 0}>
                  <TypographyCus
                    size={TEXTSIZE.size14}
                    fontWeight={'regular'}
                    textColor={theme.current.color.text[100]}
                    // style={{ maxWidth: "200px" }}
                    noWrap={false}
                    ellipsis={1}
                  >
                    {renderOption ? renderOption(item) : <>data item</>}
                  </TypographyCus>
                </Box>
              </Box>
            );
          })}
      </>
    );
  };

  const handleSelectItem = (item: any) => {
    const selectedValue = item;
    if (multiple && Array.isArray(value)) {
      console.log('item', item);
      if (value.length > 0) {
        const selectedItem = value.find((item) => selectedValue === idForItem(item));
        if (selectedItem) {
          const newValues = (value as T[]).filter((val) => idForItem(val) !== idForItem(selectedItem));
          onChange?.([...newValues] as M extends true ? T[] : T);
        } else {
          onChange?.([...(value as T[]), selectedValue] as M extends true ? T[] : T);
        }
      } else {
        onChange?.([...(value as T[]), selectedValue] as M extends true ? T[] : T);
      }
    } else {
      console.log('item2', item);
      const selectedItem = options.find((item) => idForItem(item) === selectedValue);
      if (selectedItem) onChange?.(selectedItem as M extends true ? T[] : T);
    }
    isChecked(item);
  };

  const renderNoSuggestItem = () => {
    return (
      <Box className={classes.noOptions}>
        <TypographyCus size={TEXTSIZE.size14} textColor={colors.text[100]}>
          Không có kết quả phù hợp
        </TypographyCus>
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      {title && (
        <Box className={classes.title}>
          <TypographyCus size={TEXTSIZE.size14} textColor={colors.text[70]}>
            {title}
          </TypographyCus>
        </Box>
      )}
      <Box>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box className={'selectWrap'}>
            <button
              className={inputVariant === 'outlined' ? classes.selectBoxOutline : classes.selectBoxStandard}
              onClick={onOpen}
              disabled={disabled}
              style={{
                background: disabled ? '#EDEEEF' : '#FFF',
                borderColor: error ? colors.red[100] : '#DBDDDF'
              }}
            >
              <TypographyCus
                size={TEXTSIZE.size14}
                style={{ textAlign: 'left' }}
                textColor={colors.text[100]}
                noWrap={false}
                ellipsis={1}
              >
                {renderValue?.(value)}
              </TypographyCus>
              <ArrowDropDownIcon htmlColor={colors.icon.secondary} />
            </button>
            {open && (
              <Box className={'popper'}>
                {hasSearch && renderSearchInput?.()}
                {(loading || loading === undefined) && (options.length === 0 || !maxOptions) ? (
                  <Box paddingTop={4} paddingBottom={4}>
                    <DefaultLoadingIcon />
                  </Box>
                ) : options && options.length > 0 ? (
                  <Box className={classes.listOption}>
                    <Box className={classes.menuItems} maxHeight={maxHeightListOption} overflow='auto'>
                      {/* {infiniteScroll ? (
                        <InfiniteScroll
                          loader={<DefaultLoadingIcon />}
                          fetchMore={onScroll}
                          hasMore={maxOptions ? options.length < maxOptions : false}
                          // className={classes.bodyTable}
                        >
                          <Box>{renderListOption()}</Box>
                        </InfiniteScroll>
                      ) : ( */}
                      <Box>{renderListOption()}</Box>
                      {/* )} */}
                    </Box>
                  </Box>
                ) : (
                  renderNoSuggestItem()
                )}
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      </Box>
    </Box>
  );
};

export default DropdownSearchOption;
