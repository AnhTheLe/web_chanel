import { Box, Button } from '@mui/material';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import AddressItem from './Components/AddressItem/AddressItem';

const Address = () => {
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
        >
          Thêm địa chỉ
        </Button>
      </Box>

      <AddressItem></AddressItem>
    </Box>
  );
};

export default Address;
