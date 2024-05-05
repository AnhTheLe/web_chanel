/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  PaginationPropsColorOverrides,
  Select,
  Stack,
  Typography
} from '@mui/material';
import useProductFilter from './hocs/useProductFilter';
import useStyles from './Product.style';
import colors from 'src/theme/statics/colors';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import { useState } from 'react';
import { ProductFilter } from 'src/types/product.type';
import ArrowDownIcon from 'src/assets/svg/ArrowDownIcon';
import ItemProduct from '../Components/ItemProduct/ItemProduct';

interface FilterSelect {
  name: string;
  value: ProductFilter;
}

const paginationColorCustom: PaginationPropsColorOverrides = {
  color: '#a05139',
  border: '1px solid #a05139',
  backgroundColor: '#fff4f0'
};

const Products = () => {
  const classes = useStyles();
  const { products, setProducts, changeFilter, count, loading, page, filter, initialFilter } = useProductFilter();

  const [filterSelected, setFilterSelected] = useState<{ name: string; value: ProductFilter }>({
    name: 'Mặc định',
    value: initialFilter
  });

  const listFilter: FilterSelect[] = [
    {
      name: 'Mặc định',
      value: initialFilter
    },
    {
      name: 'Giá tăng dần',
      value: { ...initialFilter, sort_by: 'price', order: 'asc' }
    },
    {
      name: 'Giá giảm dần',
      value: { ...initialFilter, sort_by: 'price', order: 'desc' }
    },
    {
      name: 'A-Z',
      value: { ...initialFilter, sort_by: 'name', order: 'asc' }
    },
    {
      name: 'Z-A',
      value: { ...initialFilter, sort_by: 'name', order: 'desc' }
    },
    {
      name: 'Hàng mới nhất',
      value: { ...initialFilter, sort_by: 'created_at', order: 'desc' }
    },
    {
      name: 'Hàng cũ nhất',
      value: { ...initialFilter, sort_by: 'created_at', order: 'asc' }
    }
  ];
  return (
    <Box sx={{ margin: '36px 0' }}>
      <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50px',
            backgroundPosition: 'center',
            backgroundColor: '#F6F6F6',
            padding: '0 20px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <TypographyCus fontSize={TEXTSIZE.size16} fontWeight='medium' style={{ lineHeight: '32px !important' }}>
              Danh mục sản phẩm
            </TypographyCus>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TypographyCus
                fontSize={TEXTSIZE.size14}
                fontWeight='regular'
                style={{ width: '108%', paddingRight: '8px' }}
              >
                Xắp xếp theo
              </TypographyCus>
              <FormControl className={classes.formControl} variant='outlined' fullWidth={true}>
                <Select
                  classes={{ outlined: classes.selectOutlined, select: classes.select }}
                  MenuProps={{
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    transformOrigin: { vertical: 'top', horizontal: 'left' },
                    classes: { list: classes.menuList },
                    autoFocus: false
                  }}
                  value={filterSelected.name}
                  variant='outlined'
                  IconComponent={({ ...props }) => ArrowDownIcon({ ...props, strokeWidth: 1 })}
                  renderValue={(value: any) => {
                    return (
                      <TypographyCus
                        size={TEXTSIZE.size14}
                        textColor={colors.text[100]}
                        style={{ maxWidth: '90%' }}
                        noWrap
                        // ellipsis={1}
                      >
                        {filterSelected.name}
                      </TypographyCus>
                    );
                  }}
                >
                  {listFilter?.map((p, index) => {
                    return (
                      <MenuItem
                        value={p.name}
                        key={index}
                        classes={{ root: classes.menuItem }}
                        onClick={() => {
                          setFilterSelected(p);
                          changeFilter(p.value);
                        }}
                      >
                        <TypographyCus
                          size={TEXTSIZE.size14}
                          textColor={colors.text[100]}
                          className={classes.menuItemText}
                        >
                          {p.name}
                        </TypographyCus>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50px',
            backgroundPosition: 'center',
            padding: '36px 0'
          }}
        >
          {products &&
            products.length > 0 &&
            products.map((product, index) => {
              return (
                <Grid xs={6} md={4} lg={3} key={index}>
                  <ItemProduct variant={product}></ItemProduct>
                </Grid>
              );
            })}
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minHeight: '50px',
            backgroundPosition: 'center'
          }}
        >
          <Pagination
            variant='outlined'
            shape='rounded'
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
            count={Math.ceil(count / 12) === 0 ? 1 : Math.ceil(count / 12)}
            color={'standard'}
            size={'medium'}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => changeFilter({ ...filter, page: value })}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
