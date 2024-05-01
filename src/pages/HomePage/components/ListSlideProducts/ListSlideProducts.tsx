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
import { Variant } from 'src/types/product.type';
interface ListSlideProductProps {
  listVariants?: Variant[];
  slidesPerView?: number;
  fixQuantitySlides?: boolean;
  onClickBagCart?: (variant: Variant) => void;
}
const ListSlideProducts = (props: ListSlideProductProps) => {
  const { listVariants, slidesPerView, fixQuantitySlides, onClickBagCart } = props;

  const handleOnClickBagCart = (variant: Variant) => {
    if (onClickBagCart) {
      onClickBagCart(variant);
    }
  };
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Swiper
        slidesPerView={slidesPerView ?? 2}
        centeredSlides={false}
        loop={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          1200: {
            slidesPerView: fixQuantitySlides ? slidesPerView ?? 3 : 3,
            spaceBetween: 5
          },
          1400: {
            slidesPerView: fixQuantitySlides ? slidesPerView ?? 4 : 4,
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
        {listVariants &&
          listVariants.map((child, index) => (
            <SwiperSlide key={index}>
              <ItemProduct key={index} variant={child} onClickBagCart={() => handleOnClickBagCart(child)} />
            </SwiperSlide>
          ))}

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
