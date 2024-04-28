import { Box, Button, Typography } from '@mui/material';
import { NameAndPriceWrap, Root, classes } from './ItemProduct.style';
import SearchIcon from 'src/assets/svg/SearchIcon';
import noImage from 'src/assets/img/noImage.png';
import bagCart from 'src/assets/img/bagCart.gif';
import { Variant } from 'src/types/product.type';
import TypographyCus from 'src/components/PosTypography/TypographyCus';
import BagCartIcon from 'src/assets/svg/BagCartIcon';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';

interface ItemProductProps {
  variant: Variant;
}

const ItemProduct = (props: ItemProductProps) => {
  const { variant } = props;
  console.log('noImage', noImage);
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
          <img src={variant.image ?? noImage} alt='' className='lazyLoad loaded' />
        </Box>

        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <Box className={classes.buttonWrap}>
          <Button className={classes.buttonBuyNow}>
            <Typography fontSize={14} fontWeight={550}>
              Mua ngay
            </Typography>
          </Button>
          <Button className={classes.buttonAddToCart}>
            <BagCartIcon></BagCartIcon>
          </Button>
        </Box>
      </Root>
      <NameAndPriceWrap
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        maxWidth={'100%'}
      >
        <TypographyCus
          fontSize={14}
          fontWeight={'regular'}
          style={{ maxWidth: 220 }}
          noWrap
          className={classes.variantNameHover}
        >
          {variant.name}
        </TypographyCus>
        <Box display={'flex'} alignItems={'center'} paddingTop={'8px'}>
          {variant.discountedPrice !== variant.retailPrice && (
            <span className={classes.comparePrice}>{formatPriceWithVNDCurrency(variant.retailPrice)}</span>
          )}
          <TypographyCus fontSize={14} fontWeight={'regular'}>
            {formatPriceWithVNDCurrency(variant.discountedPrice)}
          </TypographyCus>
        </Box>
      </NameAndPriceWrap>
    </form>
  );
};

export default ItemProduct;
