import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import colors from '../../theme/statics/colors';

import useStyles from './SearchSuggest.style';
import { removeAscent } from 'src/utils/customerHelpers';
import { Box, ClickAwayListener, InputAdornment, TextField } from '@mui/material';
import TypographyCus, { TEXTSIZE } from '../PosTypography/TypographyCus';
import ArrowDropDownIcon from 'src/assets/svg/ArrowDropDownIcon';
import SearchIcon from 'src/assets/svg/SearchIcon';

export interface SearchSuggestProps<T> {
  onClose?: () => object;
  onOpen?: () => object;
  placeholder?: string;
  title?: string;
  options: T[];
  value: T;
  renderOption: (option: T) => ReactNode;
  onChange: (value: T | null) => void;
  getLabelSelect: (value: T) => string;
  maxHeightListOption?: number;
  getOptionLabel: (option: T) => string;
  uniqKey?: string;
  hasSearch?: boolean;
  inputVariant?: 'outlined' | 'standard';
  displayPlaceholder?: string;
}

const SearchSuggest = <T,>(props: SearchSuggestProps<T>) => {
  const classes = useStyles();
  const {
    onClose,
    onOpen,
    placeholder,
    title,
    getLabelSelect,
    options,
    renderOption,
    value,
    onChange,
    maxHeightListOption = 300,
    getOptionLabel,
    uniqKey,
    inputVariant = 'outlined',
    hasSearch = true,
    displayPlaceholder
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestItems, setSuggestItems] = useState<T[]>(options);
  const uniqIdComponent = useMemo(() => uuidv4(), []);
  const optionsSelected = useMemo(() => (value ? value : null), [value]);
  // const searchInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   // Sử dụng để focus vào ô tìm kiếm khi mở component
  //   if (open && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [open]);

  useEffect(() => {
    const newSuggestItems = options.filter((item) =>
      inputValue ? removeAscent(getOptionLabel(item)).includes(removeAscent(inputValue)) : item
    );
    setSuggestItems(newSuggestItems);
  }, [options, inputValue]);

  useEffect(() => {
    setInputValue('');
  }, [open]);

  const handleClickAway = () => {
    setOpen(false);
  };

  const renderListOption = () => {
    return (
      <>
        {suggestItems &&
          suggestItems.map((item, index) => {
            return (
              <Box
                key={index}
                className={clsx('menuItem', isSelectedItem(item) ? 'selected-item' : '')}
                key-event='true'
                onClick={() => handleSelectItem(item)}
                data-id={uniqKey ? String((item as any)[uniqKey]) : index}
              >
                {renderOption ? renderOption(item) : <>data item</>}
              </Box>
            );
          })}
      </>
    );
  };

  const isSelectedItem = (item: T) => {
    return isEqual(item, optionsSelected);
  };

  const handleSelectItem = (item: T) => {
    onChange?.(item);
    setOpen(false);
  };

  const renderNoSuggestItem = () => {
    return (
      <Box className={classes.noOptions}>
        <TypographyCus size={TEXTSIZE.size14} textColor={'#79808A'}>
          Vui lòng chọn khu vực
        </TypographyCus>
      </Box>
    );
  };
  return (
    <Box className={classes.root}>
      {title && (
        <Box className={classes.title}>
          <TypographyCus size={TEXTSIZE.size12} textColor={'#79808A'}>
            {title}
          </TypographyCus>
        </Box>
      )}
      <Box>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box className={classes.selectWrap}>
            <button
              className={inputVariant === 'outlined' ? classes.selectBoxOutline : classes.selectBoxStandard}
              onClick={() => setOpen(!open)}
            >
              <TypographyCus size={TEXTSIZE.size14} textColor={colors.text[100]}>
                {value ? getLabelSelect(value) : displayPlaceholder || 'Chọn'}
              </TypographyCus>
              <ArrowDropDownIcon htmlColor={colors.icon.secondary} />
            </button>
            {open && (
              <Box className={classes.popper}>
                {hasSearch && (
                  <Box className={classes.searchBox}>
                    <TextField
                      placeholder={placeholder ?? 'Tìm kiếm'}
                      className={classes.searchInput}
                      fullWidth
                      size='small'
                      onChange={(event) => {
                        setInputValue(event.target.value);
                      }}
                      // inputRef={searchInputRef}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon htmlColor={colors.icon.primary} width={24} height={24} />
                          </InputAdornment>
                        )
                      }}
                      variant={'outlined'}
                    />
                  </Box>
                )}
                {suggestItems.length ? (
                  <Box className={classes.listOption}>
                    <Box
                      className={classes.menuItems}
                      maxHeight={maxHeightListOption}
                      overflow='auto'
                      wrapper-suggest={uniqIdComponent}
                    >
                      {renderListOption()}
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

export default SearchSuggest;
