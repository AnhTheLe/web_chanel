import { Box, Button } from '@mui/material';
import { useState } from 'react';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import PopupAddress from '../PopupCustomer/PopupAddress';
import { CustomerAddress } from 'src/types/user.type';
import { isEmpty } from 'lodash';

interface AddressItemProps {
  address: CustomerAddress;
  onDelete: (addressId: number) => void;
  onClosePopup?: () => void;
}

export const getAddressName = (address: CustomerAddress): string => {
  const addressMap = [address.address, address.province, address.district, address.ward];
  const elements = addressMap.filter(function (element) {
    return !isEmpty(element);
  });
  return elements.join(', ');
};

const AddressItem = (props: AddressItemProps) => {
  const { address, onDelete, onClosePopup } = props;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box
      margin={'20px 0 0'}
      padding={'16px 0 0'}
      borderTop={'1px #ebebeb solid'}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Box padding={'20px 0'}>
        <Box display={'flex'} flexDirection={'row'}>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='medium' style={{ marginBottom: 8 }}>
            Họ tên:
          </TypographyCus>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' style={{ marginBottom: 8 }}>
            {address.customerName}
          </TypographyCus>
          {address.isDefault && (
            <TypographyCus size={TEXTSIZE.size12} fontWeight='regular' style={{ marginLeft: 60 }} textColor={'#27AE60'}>
              Địa chỉ mặc định
            </TypographyCus>
          )}
        </Box>

        {address.address && (
          <Box display={'flex'} flexDirection={'row'}>
            <TypographyCus size={TEXTSIZE.size16} fontWeight='medium' style={{ marginBottom: 8 }}>
              Địa chỉ:
            </TypographyCus>
            <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' style={{ marginBottom: 8 }}>
              {getAddressName(address)}
            </TypographyCus>
          </Box>
        )}

        {address.phone && (
          <Box display={'flex'} flexDirection={'row'}>
            <TypographyCus size={TEXTSIZE.size16} fontWeight='medium' style={{ marginBottom: 8 }}>
              Số điện thoại:
            </TypographyCus>
            <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' style={{ marginBottom: 8 }}>
              {address.phone}
            </TypographyCus>
          </Box>
        )}

        {/* <Box display={'flex'} flexDirection={'row'}>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='medium' style={{ marginBottom: 8 }}>
            Công ty:
          </TypographyCus>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' style={{ marginBottom: 8 }}>
            ádfasdfas
          </TypographyCus>
        </Box> */}
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={() => setOpenDialog(true)}>
          <TypographyCus
            size={TEXTSIZE.size12}
            textColor='#2D9CDB'
            sx={{
              '&:hover': {
                color: '#333 !important'
              }
            }}
          >
            Chỉnh sửa địa chỉ
          </TypographyCus>
        </Button>
        <Button style={{}} onClick={() => onDelete(address.id!)}>
          <TypographyCus size={TEXTSIZE.size12} textColor='red'>
            Xoá
          </TypographyCus>
        </Button>
      </Box>
      <PopupAddress
        open={openDialog}
        setOpen={setOpenDialog}
        isCreate={false}
        address={address}
        onClosed={onClosePopup}
      ></PopupAddress>
    </Box>
  );
};

export default AddressItem;
