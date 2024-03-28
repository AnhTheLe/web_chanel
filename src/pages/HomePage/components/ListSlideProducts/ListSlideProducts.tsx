/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination, Zoom } from 'swiper/modules';
import { Box, Grid, Typography } from '@mui/material';
import ArrowLeftIcon from 'src/assets/svg/ArrowLeftIcon';
import ArrowRightIcon from 'src/assets/svg/ArrowRightIcon';
import ItemProduct from 'src/pages/Components/ItemProduct/ItemProduct';
interface ListSlideProductProps {}
const ListSlideProducts = () => {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Swiper
        slidesPerView={2}
        centeredSlides={false}
        loop={true}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 5
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1'
        }}
        modules={[Navigation, Zoom]}
        className='listProductSwiper'
        style={{ marginBottom: '26px' }}
      >
        <SwiperSlide>
          <ItemProduct />
        </SwiperSlide>

        <SwiperSlide>
          <ItemProduct />
        </SwiperSlide>
        <SwiperSlide>
          <ItemProduct />
        </SwiperSlide>
        <a className='swiper-button-prev1'>
          <ArrowLeftIcon htmlColor='#A3A8AF'></ArrowLeftIcon>
        </a>
        <a className='swiper-button-next1'>
          <ArrowRightIcon htmlColor='#A3A8AF'></ArrowRightIcon>
        </a>
      </Swiper>
    </Box>
  );
};

export default ListSlideProducts;
