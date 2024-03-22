import { Box, Grid, Typography } from '@mui/material';
import unisiver from 'src/assets/img/HomePage/unisiver.png';
import payment from 'src/assets/img/HomePage/payment.png';
import image1 from 'src/assets/img/HomePage/image1.png';
import image0 from 'src/assets/img/HomePage/image0.png';
import discount from 'src/assets/img/HomePage/discount.png';
import { Img } from './Homepage.style';

const HomePage = () => {
  const handleOnclickDiscount = () => {};
  return (
    <Box sx={{ margin: '36px 0' }}>
      <Grid container spacing={2} justifyContent='center' wrap='wrap'>
        <Grid item xs={5}>
          <Img src={unisiver} alt='' />
        </Grid>
        {/*  */}
        <Grid container item xs={3} spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ background: '#FFECE1' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
                <img src={payment} alt='' />
                <Box marginLeft={'20px'}>
                  <Typography fontSize={18} fontWeight={700}>
                    Thanh toán
                  </Typography>
                  <Typography fontSize={16} color={'#777777'}>
                    Khách hàng có thể lựa chọn một hoặc nhiều hình thức thanh toán
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <Box sx={{ background: '#FFECE1' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
                <img src={image0} alt='' />
                <Box marginLeft={'20px'}>
                  <Typography fontSize={18} fontWeight={700}>
                    Cam kết chính hãng
                  </Typography>
                  <Typography fontSize={16} color={'#777777'}>
                    Chúng tôi cam kết hàng chính hãng và đảm bảo về chất lượng sản phẩm
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <Box sx={{ background: '#FFECE1' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
                <img src={image1} alt='' />
                <Box marginLeft={'20px'}>
                  <Typography fontSize={18} fontWeight={700}>
                    Siêu tốc 2H
                  </Typography>
                  <Typography fontSize={16} color={'#777777'}>
                    Dịch vụ giao hàng nhanh 2h trong nội thành Hà Nội
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* discount */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={8}
          sx={{
            backgroundImage: `url(${discount})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70px',
            backgroundPosition: 'center'
          }}
        >
          <Typography color={'#a05139'} fontSize={24} fontWeight={700} onClick={handleOnclickDiscount}>
            KHUYẾN MÃI
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
