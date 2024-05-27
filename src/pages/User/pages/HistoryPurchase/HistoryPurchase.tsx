import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';
import orderApi from 'src/api/order.api';
import path from 'src/constants/path';
import { getPaymentStatusName } from 'src/types/Order.type';

import { PurchaseListStatus } from 'src/types/purchase.type';
import { formatPriceWithVNDCurrency } from 'src/utils/priceUtils';
import { formatCurrency, generateNameId } from 'src/utils/utils';
import useStyles from './HistoryPurchase.style';

export default function HistoryPurchase() {
  const classes = useStyles();
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getOrderList
  });

  const orderList = orders?.data.data;

  const purchaseTabsLink = orderList?.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.customerName}
    </Link>
  ));

  return (
    <Box className='py-8 pl-8'>
      <TableContainer>
        <Table sx={{ minWidth: 650, border: '1px solid rgba(224, 224, 224, 1)' }} aria-label='caption table'>
          <TableHead
            sx={{
              backgroundColor: '#ffb9a4'
            }}
          >
            <TableRow sx={{ color: '#fff' }}>
              <TableCell sx={{ padding: '16px 8px', color: '#fff' }}>Đơn hàng</TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                Ngày
              </TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                Địa chỉ
              </TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                Giá trị
              </TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                TT thanh toán
              </TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                TT vận chuyển
              </TableCell>
              <TableCell align='center' sx={{ padding: '16px 8px', color: '#fff' }}>
                Mua hàng tại
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList?.map((row, index) => (
              <TableRow key={row.orderId}>
                <TableCell component='th' scope='row'>
                  <Link to={`/user/purchase/${row.orderId}`} className={classes.link}>
                    #{index}
                  </Link>
                </TableCell>
                <TableCell align='center' sx={{ padding: '16px 8px', width: '90px' }}>
                  {row.payment.payDate.toString()}
                </TableCell>
                <TableCell sx={{ padding: '16px 8px' }}>{row.address}</TableCell>
                <TableCell sx={{ padding: '16px 8px' }}>{formatPriceWithVNDCurrency(row.payment.amount)}</TableCell>
                <TableCell align='center' sx={{ padding: '16px 8px' }}>
                  {getPaymentStatusName(row.payment.paymentStatus)}
                </TableCell>
                <TableCell align='center' sx={{ padding: '16px 8px' }}>
                  {'Đã giao'}
                </TableCell>

                <TableCell align='center' sx={{ padding: '16px 8px' }}>
                  {'Website'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
