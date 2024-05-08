import React, { useEffect, useMemo, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';

import clsx from 'clsx';
import { isEqual } from 'lodash';

import useStyles from './InputChoiceProvinceDistrict.style';
import { Countries, ProvinceDistrict } from 'src/types/AddressModels.type';
import AddressApiService from 'src/api/AddressApiService';
import { mapToProvinceDistricts, removeAscent } from 'src/utils/customerHelpers';
import { Box, ClickAwayListener, InputAdornment, TextField } from '@mui/material';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import ArrowDropDownIcon from 'src/assets/svg/ArrowDropDownIcon';
import SearchIcon from 'src/assets/svg/SearchIcon';

interface InputChoiceProvinceDistrictProps {
  value: ProvinceDistrict | undefined;
  onChange: (value: ProvinceDistrict | undefined) => void;
  fetchOption: boolean;
  required?: boolean;
  provinceId?: number;
  isInlineDisplay?: boolean;
  label: string;
}

// lưu vào tenantContext
const InputChoiceProvinceDistrict = (props: InputChoiceProvinceDistrictProps, ref: any) => {
  const { value, onChange, fetchOption } = props;
  const [provinceDistricts, setProvinceDistricts] = useState<ProvinceDistrict[]>([]);
  const [suggestItems, setSuggestItems] = useState<ProvinceDistrict[]>([]);
  const classes = useStyles();
  const _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 200
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const optionsSelected = useMemo(() => (value ? value : null), [value]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [provincesRes, districtsRes] = await Promise.all([
          AddressApiService.getProvincesByCountryId(Countries.VIET_NAM),
          AddressApiService.getDistricts(Countries.VIET_NAM)
        ]);
        const provinces = provincesRes || null;
        const districts = districtsRes || null;
        const provinceDistricts = mapToProvinceDistricts(provinces, districts);
        setProvinceDistricts(provinceDistricts);
        setSuggestItems(provinceDistricts);
      } catch (e) {}
    };
    if (fetchOption) {
      fetchLocations();
    }
  }, [fetchOption]);

  useEffect(() => {
    if (provinceDistricts) {
      const filterOptions = provinceDistricts.filter((option) =>
        inputValue
          ? removeAscent(`${option.province_name} - ${option.district_name}`).includes(removeAscent(inputValue))
          : option
      );
      setSuggestItems(filterOptions);
    }
  }, [inputValue]);

  const renderNoSuggestItem = () => {
    return (
      <Box className={classes.noOptions}>
        <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
          Không có kết quả phù hợp
        </TypographyCus>
      </Box>
    );
  };
  const handleSelectItem = (item: ProvinceDistrict) => {
    onChange?.(item);
    setOpen(false);
  };
  const isSelectedItem = (item: ProvinceDistrict) => {
    return isEqual(item, optionsSelected);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const getLabelSelect = (value: ProvinceDistrict) => {
    return `${value?.province_name} - ${value?.district_name}`;
  };

  const provinceDistrictsRender = (rowProps: ListRowProps) => {
    const item = suggestItems[rowProps.index];
    return (
      <CellMeasurer cache={_cache} key={rowProps.key} rowIndex={rowProps.index} parent={rowProps.parent}>
        {() => (
          <Box
            key={rowProps.index}
            style={rowProps.style}
            className={classes.itemWrap}
            key-event='true'
            onClick={() => handleSelectItem(item)}
            // data-index={rowProps.index}
          >
            <Box
              data-index={rowProps.index}
              data-id={`${item.province_id} - ${item.district_id}`}
              className={clsx('items', isSelectedItem(item) ? 'item-selected' : '')}
            >
              <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
                {item.province_name} - {item.district_name}
              </TypographyCus>
            </Box>
          </Box>
        )}
      </CellMeasurer>
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
          Khu vực
        </TypographyCus>
      </Box>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box className={classes.selectWrap}>
          <button className={classes.selectBoxOutline} onClick={() => setOpen(!open)}>
            <TypographyCus size={TEXTSIZE.size14} textColor={'#333'}>
              {value ? getLabelSelect(value) : 'Chọn khu vực'}
            </TypographyCus>
            <ArrowDropDownIcon />
          </button>
          {open && (
            <Box className={classes.popper}>
              <Box className={classes.searchBox}>
                <TextField
                  placeholder={'Tìm kiếm'}
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
                        <SearchIcon width={24} height={24} />
                      </InputAdornment>
                    )
                  }}
                  variant={'outlined'}
                />
              </Box>
              <Box className={classes.listOption}>
                <Box className={classes.menuItems} maxHeight={300} overflow='auto'>
                  <AutoSizer style={{ width: '100%' }} disableHeight>
                    {({ width }: { width: number }) => (
                      <List
                        deferredMeasuremenyarn
                        tCache={_cache}
                        height={suggestItems.length < 5 ? suggestItems.length * 44 : 259}
                        tabIndex={-1}
                        className={classes.boxDetail}
                        overscanRowCount={2}
                        rowCount={suggestItems.length}
                        rowHeight={44}
                        rowRenderer={provinceDistrictsRender}
                        width={width}
                      />
                    )}
                  </AutoSizer>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default InputChoiceProvinceDistrict;
// lưu vào tenantContext
