import { Box, Button, Typography } from '@mui/material';
import { NameAndPriceWrap, Root, classes } from './ItemProduct.style';
import SearchIcon from 'src/assets/svg/SearchIcon';
import noImage from 'src/assets/img/noImage.png';
import { Variant } from 'src/types/product.type';
import TypographyCus from 'src/components/PosTypography/TypographyCus';
import BagCartIcon from 'src/assets/svg/BagCartIcon';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import useModal from 'src/pages/HomePage/hocs/modal/useModal';
import CartDialog from 'src/pages/HomePage/components/DialogCart/CartDialog';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import purchaseApi from 'src/api/shoppingCart.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
import { generateNameId } from 'src/utils/utils';
import { AppContext } from 'src/contexts/app.context';
import { ExtendedPurchase } from 'src/types/purchase.type';

interface ItemProductProps {
  variant: Variant;
  onClickBagCart?: (variant: Variant) => void;
}

const ItemProduct = (props: ItemProductProps) => {
  const { variant, onClickBagCart } = props;
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: purchaseApi.getPurchases
  });

  const purchasesInCart = purchasesInCartData?.data.data;

  const navigate = useNavigate();

  const addToCartMutation = useMutation({
    mutationFn: () => {
      return purchaseApi.addToCart({ productId: variant.id, quantity: 1 });
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handleOnclickBagCart = () => {
    if (onClickBagCart) {
      onClickBagCart(variant);
    }

    addToCartMutation.mutate(onClickBagCart && onClickBagCart(variant), {
      onSuccess: (data) => {
        toast.success(data.data.message, { autoClose: 1000 });
        queryClient.invalidateQueries({ queryKey: ['purchases'] });
        setOpenCartDialog(true);
      },
      onError: (error) => {
        toast.error('Có lỗi khi thêm sản phẩm vào đơn hàng', { autoClose: 1000 });
      }
    });
  };

  const handleOnClickBuyNow = () => {
    addToCartMutation.mutate(onClickBagCart && onClickBagCart(variant), {
      onSuccess: (data) => {
        // refetch();
        const purchasesInCartDatas = purchasesInCartData?.data.data;
        if (!extendedPurchases.find((item) => item.variant.id === variant.id)) {
          setExtendedPurchases([
            ...extendedPurchases,
            {
              variant: variant,
              quantity: 1,
              checked: true,
              disabled: false,
              idCart: data.data.data.id
            } as unknown as ExtendedPurchase
          ]);
        } else {
          const checkedPurchase: ExtendedPurchase[] = extendedPurchases.map((item) =>
            item.variant.id === variant.id
              ? {
                  ...item,
                  quantity: purchasesInCartDatas?.find((p) => p.variant.id === variant.id)?.quantity || 1,
                  checked: true
                }
              : { ...item, checked: false }
          );
          setExtendedPurchases(checkedPurchase);
        }
        navigate('/checkout');
      },
      onError: (error) => {
        toast.error('Có lỗi khi thêm sản phẩm vào đơn hàng', { autoClose: 1000 });
      }
    });

    // set toàn bộ variant trong giỏ thành uncheck
    if (extendedPurchases.find((item) => item.variant.id === variant.id && item.checked === false)) {
      navigate('/checkout');
    }
  };

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
          <img
            src={variant.image ?? noImage}
            alt=''
            className='lazyLoad loaded'
            style={{ height: '100%', borderRadius: 4 }}
          />
        </Box>

        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <Box className={classes.buttonWrap}>
          <Button className={classes.buttonBuyNow} onClick={handleOnClickBuyNow}>
            <Typography fontSize={14} fontWeight={550}>
              Mua ngay
            </Typography>
          </Button>
          <Button className={classes.buttonAddToCart} onClick={handleOnclickBagCart}>
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
          onClick={() => {
            navigate(
              `${path.home}${generateNameId({ name: variant.name, id: variant.id.toString(), productId: variant.baseId.toString() })}`
            );
          }}
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
      <CartDialog isOpenModal={openCartDialog} setOpen={setOpenCartDialog} title='Thêm vào giỏ hàng thành công' />
    </form>
  );
};

export default ItemProduct;
