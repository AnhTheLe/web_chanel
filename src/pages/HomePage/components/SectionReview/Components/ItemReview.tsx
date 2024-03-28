import { Box, Typography } from '@mui/material';
import { ThumbReview } from './ItemReview.style';
interface ItemReviewProps {
  imageUrl: string;
  customerName: string;
  content: string;
}

const ItemReview = (props: ItemReviewProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <ThumbReview>
        <img
          src={props.imageUrl}
          alt=''
          style={{ borderRadius: '103px', borderStyle: 'none', height: 'auto', marginBottom: '15px' }}
        />
      </ThumbReview>

      <Typography fontSize={16} fontWeight={700} style={{ margin: '0 0 16px' }}>
        {props.customerName}
      </Typography>

      <Typography fontSize={14} color={'#777777'} fontWeight={400} textAlign={'center'} style={{ maxWidth: '90%' }}>
        {props.content}
      </Typography>
    </Box>
  );
};

export default ItemReview;
