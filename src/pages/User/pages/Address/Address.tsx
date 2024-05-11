import { Box, Button } from '@mui/material';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import AddressItem from './Components/AddressItem/AddressItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import addressApi from 'src/api/address.api';
import PopupAddress from './Components/PopupCustomer/PopupAddress';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Address = () => {
  const { data: addresses, refetch } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAllAddress
  });

  const deleteAddressMutation = useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      toast.success('Xóa địa chỉ thành công');
      refetch();
    }
  });

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    refetch();
  }, [openDialog, refetch]);

  const handleDeleteAddress = (addressId: number) => {
    deleteAddressMutation.mutate(addressId);
  };

  const handleClosePopup = () => {
    refetch();
  };

  const listAddresses = addresses?.data.data || [];
  return (
    <Box>
      <Box display={'flex'} flexDirection={'column'}>
        <TypographyCus size={TEXTSIZE.size20} fontWeight='medium' style={{ marginBottom: 16 }}>
          ĐỊA CHỈ CỦA BẠN
        </TypographyCus>
        <Button
          component='button' // Add the component prop with the value of 'button'
          style={{
            backgroundColor: '#ffb9a4',
            border: '1px solid #F5A2A2',
            maxWidth: '15%',
            color: '#fff',
            height: '45px'
          }}
          onClick={() => setOpenDialog(true)}
        >
          Thêm địa chỉ
        </Button>
      </Box>

      {listAddresses.map((address, index) => (
        <AddressItem key={index} address={address} onDelete={handleDeleteAddress} onClosePopup={handleClosePopup} />
      ))}
      <PopupAddress open={openDialog} setOpen={setOpenDialog} isCreate={true} />
    </Box>
  );
};

export default Address;
