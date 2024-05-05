import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import productApi from 'src/api/product.api';
import { getIdFromNameId } from 'src/utils/utils';

const ProductDetail = () => {
  const { nameId } = useParams();
  const ids = getIdFromNameId(nameId as string);
  const { data: productDetailData } = useQuery({
    queryKey: ['product', Number(ids[1])],
    queryFn: () => productApi.getProductDetail(Number(ids[1]))
  });

  console.log(productDetailData?.data.data);
  return <div>ProductDetail</div>;
};

export default ProductDetail;
