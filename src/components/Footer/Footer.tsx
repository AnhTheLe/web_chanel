import { Box, Grid, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import EmailIcon from 'src/assets/svg/EmailIcon';
import FacebookIcon from 'src/assets/svg/FacebookIcon';
import InstagramIcon from 'src/assets/svg/InstagramIcon';
import MessIcon from 'src/assets/svg/MessIcon';
import YoutubeIcon from 'src/assets/svg/YoutubeIcon';
import footerImg from 'src/assets/img/HomePage/footerImg.png';
import logo from 'src/assets/img/logo.png';
import { GridItemFooter, LinkFooter } from './Footer.style';
import LocationIcon from 'src/assets/svg/LocationIcon';
import EmailSmallIcon from 'src/assets/svg/EmailSmallIcon';
import PhoneIcon from 'src/assets/svg/PhoneIcon';
import MapsicoIcon from 'src/assets/svg/MapsicoIcon';

const Footer = () => {
  return (
    <footer>
      <Grid container justifyContent={'center'} sx={{ background: '#ffece1', padding: '22px 0' }}>
        <Grid item xs={3} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} padding={'0 16px'}>
          <LinkFooter>
            <FacebookIcon />
          </LinkFooter>
          <LinkFooter href={'https://www.facebook.com/messages'} sx={{ cursor: 'pointer' }}>
            <MessIcon />
          </LinkFooter>
          <LinkFooter href={''} sx={{ cursor: 'pointer' }}>
            <InstagramIcon />
          </LinkFooter>
          <LinkFooter href={'https://www.youtube.com/'} sx={{ cursor: 'pointer' }}>
            <YoutubeIcon />
          </LinkFooter>
        </Grid>
        <Grid item xs={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={'0 16px'}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'0 16px'}>
            <EmailIcon />
            <Typography fontSize={16} fontWeight={700} style={{ paddingLeft: '12px' }}>
              Nhận bản tin làm đẹp từ chúng tôi
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          backgroundImage: `url(${footerImg})`,
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 0',
          alignItems: 'center',
          minHeight: '70px',
          backgroundPosition: 'center'
        }}
      >
        <Grid container item md={6} lg={2}>
          <GridItemFooter item xs={12} sx={{ marginBottom: '16px' }}>
            <img src={logo} alt='' />
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <LocationIcon width={'24px'} height={'24px'}></LocationIcon>
            <Typography style={{ marginLeft: 12 }}>Hà Nội</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <EmailSmallIcon width={'24px'} height={'24px'}></EmailSmallIcon>
            <Typography style={{ marginLeft: 12 }}>anh@hust.edu.vn</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <PhoneIcon width={'24px'} height={'24px'}></PhoneIcon>
            <Typography style={{ marginLeft: 12 }}>Hà Nội</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <MapsicoIcon width={'24px'} height={'24px'} fill='#FFB9A4'></MapsicoIcon>
            <Typography style={{ marginLeft: 12 }}>Hệ thống cửa hàng</Typography>
          </GridItemFooter>
        </Grid>

        {/*  */}
        <Grid container item md={6} lg={2}>
          <GridItemFooter item xs={12} sx={{ marginBottom: '18px', marginTop: '15px' }}>
            <Typography color={'#a05139'} fontWeight={700}>
              HỖ TRỢ KHÁCH HÀNG
            </Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Trang chủ</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Sản phẩm</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Blog</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Giới thiệu</Typography>
          </GridItemFooter>
        </Grid>

        {/*  */}
        <Grid container item md={6} lg={2}>
          <GridItemFooter item xs={12} sx={{ marginBottom: '18px', marginTop: '15px' }}>
            <Typography color={'#a05139'} fontWeight={700}>
              Chính sách
            </Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Trang chủ</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Sản phẩm</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Blog</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Giới thiệu</Typography>
          </GridItemFooter>
        </Grid>

        {/*  */}
        <Grid container item md={6} lg={2}>
          <GridItemFooter item xs={12} sx={{ marginTop: '15px' }}>
            <Typography color={'#a05139'} fontWeight={700}>
              Giờ mở cửa
            </Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <Typography>Từ 9:00 - 21:30 tất cả các ngày trong tuần (bao gồm cả các ngày lễ, ngày Tết).</Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12} sx={{ marginBottom: '18px' }}>
            <Typography color={'#a05139'} fontWeight={700}>
              Góp ý khiếu nại
            </Typography>
          </GridItemFooter>
          <GridItemFooter item xs={12}>
            <PhoneIcon width={'24px'} height={'24px'}></PhoneIcon>
            <Typography style={{ marginLeft: 12 }}>0388735470</Typography>
          </GridItemFooter>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
