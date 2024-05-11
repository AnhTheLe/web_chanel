import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddressApiService from 'src/api/AddressApiService';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import SearchSuggest from 'src/components/searchSuggest/SearchSuggest';
import { Ward } from 'src/types/AddressModels.type';

interface InputChoiceWardProps {
  value: Ward | null | undefined;
  onChange: (value: Ward | null | undefined) => void;
  fetchOption: boolean;
  required?: boolean;
  cityId?: number;
  isInlineDisplay?: boolean;
  label: string;
  districtId: number | null | undefined;
}

// lưu vào tenantContext
const InputChoiceWard = (props: InputChoiceWardProps, ref: any) => {
  const { value, onChange, fetchOption, required, cityId, isInlineDisplay, districtId, label } = props;
  const [wards, setWards] = useState<Ward[]>([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const wards = await AddressApiService.getWards(districtId!);
        setWards(wards);
      } catch (e) {}
    };
    if (fetchOption && districtId) {
      fetchLocations();
    }
  }, [fetchOption, districtId]);

  const renderValue = () => {
    return `${value?.name}`;
  };

  return (
    <Box marginBottom={16}>
      <SearchSuggest
        uniqKey={'id'}
        getLabelSelect={renderValue}
        title={label}
        value={value}
        getOptionLabel={(option) => `${option?.name}` || ''}
        renderOption={(option) => {
          return <TypographyCus size={TEXTSIZE.size14}>{option?.name}</TypographyCus>;
        }}
        options={wards}
        onChange={(value) => {
          if (!value?.id) {
            onChange(null);
          } else {
            onChange(value);
          }
        }}
        displayPlaceholder='Chọn Phường/Xã'
      />
    </Box>
  );
};

export default InputChoiceWard;
// lưu vào tenantContext
