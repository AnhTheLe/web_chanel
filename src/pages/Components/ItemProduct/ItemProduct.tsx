import { Box, Button, Typography } from '@mui/material';
import lips from 'src/assets/img/test/lips.png';
import { Root, classes } from './ItemProduct.style';
import SearchIcon from 'src/assets/svg/SearchIcon';

const ItemProduct = () => {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
      }}
      className='swiper-zoom-container'
    >
      <Root className={classes.rootImg}>
        <Box className={classes.img}>
          <img src={lips} alt='' className='lazyLoad loaded' />
        </Box>

        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <Button className={classes.button}>
          <Typography fontSize={16} fontWeight={700}>
            Chi tiết
          </Typography>
        </Button>
      </Root>
      <Box display={'flex'} justifyContent={'center'} maxWidth={'100%'}>
        <Typography fontSize={14} fontWeight={500}>
          Xịt khoáng Avena
        </Typography>
      </Box>
    </form>
  );
};

export default ItemProduct;
