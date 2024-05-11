import { Box } from '@mui/material';
import { Variant } from 'src/types/product.type';
import useStyles from './VariantItem.style';
import emptyImagePath from 'src/assets/img/emptyImage.png';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import DiscountIcon from 'src/assets/svg/DiscountIcon';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';

interface VariantItemProps {
  variant: Variant;
  quantity: number;
}

const VariantItem = (props: VariantItemProps) => {
  const { variant, quantity } = props;
  const classes = useStyles();
  return (
    <Box className='mb-4'>
      <Box className='flex flex-row justify-between items-center'>
        <Box className='flex'>
          <Box className={classes.imageContainer}>
            <Box className={classes.imageItem}>
              <img src={variant?.image ?? emptyImagePath} alt='' style={{ objectFit: 'cover' }} />
            </Box>
            <Box className={classes.quantity}>{quantity}</Box>
          </Box>
          <Box className='flex flex-col justify-start'>
            <TypographyCus size={TEXTSIZE.size14} fontWeight='regular' maxWidth={'150px'} noWrap>
              {variant.name}
            </TypographyCus>
            {variant.discount > 0 && (
              <Box className='flex flex-row justify-start items-center'>
                <DiscountIcon></DiscountIcon>
                <TypographyCus size={TEXTSIZE.size12} fontWeight='regular' style={{ marginLeft: 4 }}>
                  `-{formatPriceWithVNDCurrency(variant.discount)}`
                </TypographyCus>
              </Box>
            )}
          </Box>
        </Box>
        <TypographyCus size={TEXTSIZE.size14} textColor='#717171'>
          {formatPriceWithVNDCurrency(variant.discountedPrice * quantity)}
        </TypographyCus>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default VariantItem;
