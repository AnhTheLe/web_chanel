import { Box, Paper, Typography } from '@mui/material';
import { Blog } from 'src/types/blog.type';
import dayjs from 'dayjs';
import CommentIcon from 'src/assets/svg/CommentIcon';

interface BlogProps {
  blog: Blog;
}

const BlogItem = (props: BlogProps) => {
  const { blog } = props;
  return (
    <Paper
      className='blog-item'
      elevation={2}
      sx={{
        padding: '16px',
        marginBottom: '32px',
        width: '100%',
        height: '100%'
      }}
    >
      <img
        src={blog.images?.[0].url ?? 0}
        alt={blog.title}
        style={{
          width: '100%',
          height: 'auto',
          marginBottom: '24px'
        }}
      />
      <a href={blog.url} target='_blank' rel='noreferrer'>
        <Typography fontSize={24} fontWeight={700} color={'#212121'}>
          {blog.title}
        </Typography>
      </a>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}
      >
        <Typography fontSize={16} fontWeight={550} color={'#546E7A'}>
          Vào {dayjs(blog.published).format('DD/MM/YYYY')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <CommentIcon></CommentIcon>
          <Typography fontSize={16} fontWeight={550} color={'#546E7A'}>
            {blog.replies.totalItems} bình luận
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BlogItem;
