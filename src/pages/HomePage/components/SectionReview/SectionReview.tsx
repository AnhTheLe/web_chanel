/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Grid, Typography } from '@mui/material';
import ArrowLeftIcon from 'src/assets/svg/ArrowLeftIcon';
import ArrowRightIcon from 'src/assets/svg/ArrowRightIcon';
import colors from 'src/theme/statics/colors';

import image0 from 'src/assets/img/customer/image0.png';
import image1 from 'src/assets/img/customer/image1.png';
import image2 from 'src/assets/img/customer/image2.png';
import image3 from 'src/assets/img/customer/image3.png';
import image4 from 'src/assets/img/customer/image4.png';
import ItemReview from './Components/ItemReview';
const SectionReview = () => {
  const listData = [
    {
      imageUrl: image0,
      customerName: 'Chị Vân Lava -  CMO Sapa Group',
      content:
        'Đối với lĩnh vực mỹ phẩm, việc tìm kiếm khách hàng mục tiêu chính là chìa khóa giúp bạn gia tăng lượng tiêu thụ hàng hóa.  Hãy lập ra cho mình một kế hoạch thật chi tiết, cụ thể với data khách hàng phù hợp để tăng doanh số cao nhất.'
    },
    {
      imageUrl: image1,
      customerName: 'Chị Kiều Trang',
      content:
        'Làn da của mình thuộc kiểu da khô, thực sự mình đã tìm rất nhiều nơi bán mỹ phẩm để đáp ứng được làn da của mình, nhưng khi đến với Rosie mình như được bừng tỉnh lại với làn da mềm mịn, không còn khô ráp nữa.'
    },
    {
      imageUrl: image2,
      customerName: 'Chị Trà My - CEO My Nails',
      content:
        'Mình thường xuyên ghé qua đây để chăm chút bản thân, công việc của mình cũng liên quan đến đồ mỹ phẩm nên mình cảm thấy Rosie phục vụ khách hàng rất chu đáo, các bạn còn được ưu đãi thành viên nữa, mình rất thích nơi đây.'
    },
    {
      imageUrl: image3,
      customerName: 'Chị Kem Robi - Người mẫu ảnh',
      content:
        'ông việc của mình thường xuyên tiếp xúc với đồ mỹ phẩm, nên mình rất ngại dùng phải hàng không rõ xuất xứ, nhưng từ khi mình biết tới Rosie thì mình rất yên tâm về chất lượng sản phẩm.'
    },
    {
      imageUrl: image4,
      customerName: 'Chị Quỳnh Hugo',
      content:
        'Mình thường xuyên phải dùng mỹ phẩm khi đi công tác hoặc ra đường, vì làn da kén cá chọn canh của mình chăm sóc rất vất vả. Nhưng giờ thì mọi chuyện dễ dàng hơn nhiều khi sử dụng sản phẩm tại Rosie.'
    }
  ];

  return (
    <>
      <Grid
        margin={'36px 0px'}
        container
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        wrap='wrap'
        style={{ backgroundColor: `${colors.pinkOrange[5]}`, padding: '20px 0' }}
      >
        <Grid xs={11} sm={10} md={8}>
          <Typography fontSize={24} fontWeight={500} style={{ padding: ' 10px 0' }} textAlign={'center'}>
            Khách hàng của chúng tôi nói gì
          </Typography>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            navigation={{
              nextEl: '.swiper-button-next1',
              prevEl: '.swiper-button-prev1'
            }}
            pagination={true}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            className='sectionReviewSwiper'
            style={{ paddingBottom: '36px', transform: 'none' }}
          >
            {listData.map((item, index) => (
              <SwiperSlide key={index}>
                <ItemReview imageUrl={item.imageUrl} customerName={item.customerName} content={item.content} />
              </SwiperSlide>
            ))}
            <a className='swiper-button-prev1'>
              <ArrowLeftIcon htmlColor='#A3A8AF'></ArrowLeftIcon>
            </a>
            <a className='swiper-button-next1'>
              <ArrowRightIcon htmlColor='#A3A8AF'></ArrowRightIcon>
            </a>
          </Swiper>
        </Grid>
      </Grid>
    </>
  );
};

export default SectionReview;
