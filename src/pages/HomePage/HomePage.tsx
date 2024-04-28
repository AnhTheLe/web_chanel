import { Box, Container, Grid, Typography } from '@mui/material';
import unisiver from 'src/assets/img/HomePage/unisiver.png';
import vitaminC from 'src/assets/img/HomePage/vitaminC.png';
import payment from 'src/assets/img/HomePage/payment.png';
import image1 from 'src/assets/img/HomePage/image1.png';
import image0 from 'src/assets/img/HomePage/image0.png';
import discountURL from 'src/assets/img/HomePage/discount.png';
import newProductsURL from 'src/assets/img/HomePage/newProducts.png';
import hotSaleProductsURL from 'src/assets/img/HomePage/hotSaleProducts.png';

import { Img } from './Homepage.style';
import OutstandingBrand from './components/OutstandingBrand/OutstandingBrand';
import SectionReview from './components/SectionReview/SectionReview';
import greenBackground from 'src/assets/img/HomePage/greenBackground.png';
import productDiscount from 'src/assets/img/HomePage/productDiscount.png';
import ListSlideProducts from './components/ListSlideProducts/ListSlideProducts';
import { useQuery } from '@tanstack/react-query';
import productApi from 'src/api/product.api';
import { ProductFilter } from 'src/types/product.type';

const HomePage = () => {
  const handleOnclickDiscount = () => {};

  const top10NewProducts: ProductFilter = { page: 1, size: 10 };

  const { data: listVariants } = useQuery({
    queryKey: ['listVariants', top10NewProducts],
    queryFn: () => {
      return productApi.getListVariants(top10NewProducts);
    }
  });

  const top10NewVariants = listVariants?.data.data;
  console.log('top10NewVariants', top10NewVariants);

  const { data: topDiscountVariant } = useQuery({
    queryKey: ['topDiscountVariant'],
    queryFn: productApi.getTopDiscountVariant
  });

  const { data: topSaleVariant } = useQuery({
    queryKey: ['topSaleVariant'],
    queryFn: productApi.getTopSaleVariant
  });

  const topSaleVariants = topSaleVariant?.data.data?.map((item) => item.variant) ?? [];

  const topDiscountVariants = topDiscountVariant?.data.data;

  return (
    <Box sx={{ margin: '36px 0' }}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={5}>
          <Img src={unisiver} alt='' />
        </Grid>
        {/*  */}
        <Grid container item xs={11} sm={10} md={8} lg={3} spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ background: '#FFECE1' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '24px' }}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '24px' }}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '24px' }}>
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
          xs={11}
          sm={10}
          md={8}
          sx={{
            backgroundImage: `url(${discountURL})`,
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

      {/* List discount product */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid item xs={11} sm={10} md={8} lg={4}>
          <ListSlideProducts listVariants={topDiscountVariants} fixQuantitySlides slidesPerView={2}></ListSlideProducts>
        </Grid>
        <Grid item xs={11} sm={10} md={8} lg={4} paddingLeft={'24px'}>
          <Img src={productDiscount} alt='' />
        </Grid>
      </Grid>

      {/* new product */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            backgroundImage: `url(${newProductsURL})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70px',
            backgroundPosition: 'center'
          }}
        >
          <Typography color={'#225a21'} fontSize={24} fontWeight={700} onClick={handleOnclickDiscount}>
            HÀNG MỚI VỀ
          </Typography>
        </Grid>
      </Grid>

      {/* top 10 new  product */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid item xs={11} sm={10} md={8}>
          <ListSlideProducts listVariants={top10NewVariants} slidesPerView={4}></ListSlideProducts>
        </Grid>
      </Grid>

      {/* hot sale */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            backgroundImage: `url(${hotSaleProductsURL})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Typography color={'#2e747e'} fontSize={24} fontWeight={700} onClick={handleOnclickDiscount}>
            SẢN PHẨM BÁN CHẠY
          </Typography>
        </Grid>
      </Grid>

      {/* top 10 new  product */}
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid item xs={11} sm={10} md={8}>
          <ListSlideProducts listVariants={topSaleVariants} slidesPerView={4}></ListSlideProducts>
        </Grid>
      </Grid>

      <OutstandingBrand></OutstandingBrand>
      <SectionReview />

      {/*  */}
      <Grid container spacing={2} justifyContent='center' padding={'92px 0'}>
        <Grid item xs={11} sm={10} md={8} lg={5} style={{ paddingRight: 46 }}>
          <img src={vitaminC} alt='' />
        </Grid>
        {/*  */}
        <Grid container item xs={11} sm={10} md={8} lg={3} spacing={1}>
          <Grid item xs={12}>
            <Box>
              <Typography fontSize={'24px'} fontWeight={500} style={{ marginBottom: 20 }}>
                Giải Pháp Trang Điểm Dễ Dàng Cho Phụ Nữ Việt
              </Typography>
              <Typography fontSize={'14px'} fontWeight={400} color={'#777777'}>
                Dựa trên kinh nghiệm 15 năm chinh chiến trong ngành làm đẹp và hợp tác với các tập đoàn mỹ phẩm nổi
                tiếng trên Thế giới, Makeup Artist Quách Ánh cùng những cộng sự của mình đã tạo nên thương hiệu mỹ phẩm
                Lemonade. Với các dòng sản phẩm đa công năng và tiện dụng được nghiên cứu dựa trên khí hậu và làn da của
                phụ nữ Việt, Lemonade giúp bạn hoàn thiện vẻ đẹp một cách nhanh chóng và dễ dàng hơn: Dễ dàng sử dụng,
                dễ dàng kết hợp và dễ dàng mang đi.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/*  */}
      <Box width={'100%'}>
        <Box
          sx={{
            backgroundImage: `url(${greenBackground})`,
            padding: '85px 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              background: '#f8f3bc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '680px',
              padding: '40px 94px'
            }}
          >
            <Typography fontSize={'16px'} fontWeight={700} style={{ paddingBottom: '8px' }}>
              Chìa khóa giúp bạn gia tăng lượng tiêu thụ hàng hóa.
            </Typography>
            <Typography color={'#455C0C'} textAlign={'center'} fontSize={14}>
              Hãy lập ra cho mình một kế hoạch thật chi tiết, cụ thể với data khách hàng phù hợp để tăng doanh số cao
              nhất.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
