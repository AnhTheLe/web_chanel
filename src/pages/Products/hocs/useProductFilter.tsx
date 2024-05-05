import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { ProductFilter, ProductFilterItem, Variant } from 'src/types/product.type';
import productApi from 'src/api/product.api';

const initialFilter: ProductFilter = {
  query: undefined,
  categoryIds: undefined,
  startDate: undefined,
  endDate: undefined,
  sort_by: 'created_at',
  order: 'desc',
  page: 1,
  size: 12
};

const useProductFilter = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>(initialFilter);
  const [products, setProducts] = useState<Variant[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const firstRender = useRef(true);
  const [firstChange, setFirstChange] = useState<boolean>(true);

  useEffect(() => {
    if (queryParams) {
      const filterUpdates: Partial<ProductFilter> = {};
      const categoryIds = queryParams.get(ProductFilterItem.categoryIds)?.trim().replace(/,$/, '') || undefined;
      const query = queryParams.get(ProductFilterItem.query) ?? undefined;
      const page = queryParams.get(ProductFilterItem.page) || 1;
      const limit = queryParams.get(ProductFilterItem.size) || 12;
      const sort_by = queryParams.get(ProductFilterItem.sortBy) as 'created_at' | 'name' | 'price' | undefined;
      const order = queryParams.get(ProductFilterItem.order) as 'asc' | 'desc' | undefined;

      filterUpdates.query = query;
      filterUpdates.page = Number(page);
      filterUpdates.size = Number(limit);
      filterUpdates.sort_by = sort_by;
      filterUpdates.order = order;
      filterUpdates.categoryIds = categoryIds;
      if (isEqual(filterUpdates, filters)) {
        return;
      }
      setFilters((prevFilter) => ({ ...prevFilter, ...filterUpdates }));
      // setQueryParams(queryParams);
    }
  }, [queryParams]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const listVariants = await productApi.getListVariants(filters);
        const count = listVariants.data.totalItems;
        setProducts(listVariants?.data.data || []); // Fix: Provide a default value of an empty array
        setCount(count);
        setLoading(false);
      } catch (error) {
        /* empty */
      }
    })();
  }, [filters]);

  const applyFiltersSearchParam = (queryParams: URLSearchParams, searchParams: ProductFilter) => {
    for (const key in searchParams) {
      const value = searchParams[key as keyof ProductFilter];

      if (value) {
        queryParams.set(key, value.toString());
      } else {
        queryParams.delete(key);
      }
    }
  };

  const changeFilter = (filter: ProductFilter) => {
    if (filter.page === filters.page) {
      filter.page = 1;
    }

    const queryParams = new URLSearchParams();
    applyFiltersSearchParam(queryParams, filter);
    setQueryParams(queryParams);
    setFirstChange(false);
  };

  return {
    changeFilter: changeFilter,
    // changePage: changePage,
    setProducts: setProducts,
    products: products,
    filter: filters,
    count: count,
    loading: loading,
    page: filters.page,
    initialFilter: initialFilter
  };
};

export default useProductFilter;
