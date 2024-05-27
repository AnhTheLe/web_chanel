import { useParams } from 'react-router-dom';
import useStyles from './DetailPurchase.style';
import { useQuery } from '@tanstack/react-query';
import orderApi from 'src/api/order.api';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import { getPaymentMethodName, getPaymentStatusName } from 'src/types/Order.type';
import emptyImagePath from 'src/assets/img/emptyImage.png';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';

const DetailPurchase = () => {
  const classes = useStyles();
  const orderId = useParams<{ orderId: string }>().orderId;
  console.log(orderId);
  const { data: orderData } = useQuery({
    queryKey: ['orderData', orderId],
    queryFn: () => orderApi.getOrderDetail(Number(orderId))
  });

  const orderDetail = orderData?.data.data;
  const orderLines = orderDetail?.orderLines;
  const total = orderDetail?.payment.amount;
  console.log(orderDetail);
  return (
    <Box className='py-8 pl-8'>
      <Box className='flex justify-between items-center'>
        <TypographyCus size={TEXTSIZE.size18}>Chi tiết đơn hàng #{orderId}</TypographyCus>
        <TypographyCus size={TEXTSIZE.size14}>Ngày tạo {orderDetail?.payment.payDate.toString()}</TypographyCus>
      </Box>

      <Box className='flex flex-col justify-start '>
        <Box className='flex justify-between items-center'>
          <Box className='flex items-center pt-4'>
            <TypographyCus size={TEXTSIZE.size14}>Trạng thái thanh toán:</TypographyCus>
            <TypographyCus size={TEXTSIZE.size14} fontWeight='medium' style={{ marginLeft: 8 }}>
              {orderDetail?.payment.paymentStatus
                ? getPaymentStatusName(orderDetail?.payment.paymentStatus)
                : 'Không xác định'}
            </TypographyCus>
          </Box>
        </Box>
        <TypographyCus size={TEXTSIZE.size14}>Mua hàng tại: Website</TypographyCus>
      </Box>

      <Box className='flex flex-row justify-between pt-6'>
        <Box className='flex flex-col justify-start'>
          <TypographyCus size={TEXTSIZE.size18}>Địa chỉ giao hàng</TypographyCus>
          <Box className='flex flex-col justify-start border border-[#] rounded-md p-3 mt-3 h-24'>
            <TypographyCus size={TEXTSIZE.size14} fontWeight='medium'>
              {orderDetail?.customerName}
            </TypographyCus>
            <TypographyCus size={TEXTSIZE.size14}>Địa chỉ: {orderDetail?.address}</TypographyCus>
            <TypographyCus size={TEXTSIZE.size14}>Số điện thoại: {orderDetail?.phone}</TypographyCus>
          </Box>
        </Box>
        <Box className='flex flex-col justify-start'>
          <TypographyCus size={TEXTSIZE.size18}>Thanh toán</TypographyCus>
          <Box className='flex flex-col justify-start border border-[#] rounded-md p-3 mt-3 h-24'>
            <TypographyCus size={TEXTSIZE.size14}>
              {getPaymentMethodName(orderDetail?.payment.paymentMethod ?? '')}
            </TypographyCus>
          </Box>
        </Box>
        <Box className='flex flex-col justify-start'>
          <TypographyCus size={TEXTSIZE.size18}>Ghi chú</TypographyCus>
          <Box className='flex flex-col justify-start border border-[#] rounded-md p-3 mt-3 h-24'>
            <TypographyCus size={TEXTSIZE.size14}>Không có ghi chú</TypographyCus>
          </Box>
        </Box>
      </Box>

      <Box className='border border-[#] rounded-md mt-8'>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align='right'>Đơn giá</TableCell>
                <TableCell align='right'>Số lượng</TableCell>
                <TableCell align='right'>Tổng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetail?.orderLines?.map((row) => (
                <TableRow key={row.variant.id}>
                  <TableCell>
                    <Box className='flex'>
                      <Box className={classes.imageContainer}>
                        <Box className={classes.imageItem}>
                          <img src={row.variant?.image ?? emptyImagePath} alt='' style={{ objectFit: 'cover' }} />
                        </Box>
                      </Box>
                      <Box className='flex flex-col justify-start items-center'>
                        <TypographyCus size={TEXTSIZE.size14} fontWeight='regular' maxWidth={'150px'} noWrap>
                          {row.variant.name}
                        </TypographyCus>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align='right'>{formatPriceWithVNDCurrency(row?.variant.retailPrice)}</TableCell>
                  <TableCell align='right'>{row?.quantity}</TableCell>
                  <TableCell align='right'>
                    {formatPriceWithVNDCurrency(row?.variant.retailPrice * row?.quantity)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Khuyến mãi</TableCell>
                <TableCell align='right'>{formatPriceWithVNDCurrency(orderDetail?.discount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phí vận chuyển</TableCell>
                <TableCell align='right'>Giao hàng tận nơi</TableCell>
                <TableCell align='right'>{formatPriceWithVNDCurrency(40000)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Tổng tiền</TableCell>
                <TableCell align='right'>
                  <TypographyCus size={TEXTSIZE.size18} textColor='#CA170E'>
                    {formatPriceWithVNDCurrency(orderDetail?.payment.amount)}
                  </TypographyCus>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DetailPurchase;
