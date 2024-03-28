/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import innisfree from 'src/assets/img/branhs/innisfree.png';
import mac from 'src/assets/img/branhs/mac.png';
import moschino from 'src/assets/img/branhs/moschino.png';
import ponds from 'src/assets/img/branhs/ponds.png';
import shiseido from 'src/assets/img/branhs/shiseido.png';
import theFaceShop from 'src/assets/img/branhs/theFaceShop.png';

import './style.scss';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import { Grid, Typography } from '@mui/material';
import ArrowLeftIcon from 'src/assets/svg/ArrowLeftIcon';
import ArrowRightIcon from 'src/assets/svg/ArrowRightIcon';
const OutstandingBrand = () => {
  return (
    <>
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid item xs={11} sm={10} md={8}>
          <Typography fontSize={24} fontWeight={500} style={{ padding: ' 10px 0' }}>
            Thương hiệu nổi bật
          </Typography>
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20
              }
            }}
            navigation={{
              nextEl: '.swiper-button-next1',
              prevEl: '.swiper-button-prev1'
            }}
            modules={[Navigation]}
            className='outStandingSwiper'
            style={{ marginBottom: '26px' }}
          >
            <SwiperSlide>
              <a className='brand' title='innisfree'>
                <img src={innisfree} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={mac} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={moschino} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={ponds} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={shiseido} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={theFaceShop} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={innisfree} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={mac} />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className='brand'>
                <img src={moschino} />
              </a>
            </SwiperSlide>
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

export default OutstandingBrand;
