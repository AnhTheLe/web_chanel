import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import blogApi from 'src/api/blog.api';
import BlogItem from './components/BlogItem';

const Blogs = () => {
  const { data: blogsResponse, refetch } = useQuery({
    queryKey: ['blogsResponse'],
    queryFn: blogApi.getBlogList
  });

  const blogs = blogsResponse?.data?.items; // Access the 'data' property before accessing 'items'
  return (
    <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
      <Grid
        item
        xs={11}
        sm={10}
        md={8}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          minHeight: '50px',
          padding: '0 20px'
        }}
      >
        {blogs && !!blogs.length && (
          <>
            {/* Hiển thị blog đầu tiên */}
            <BlogItem key={blogs[0].id} blog={blogs[0]} />

            <Grid container spacing={4}>
              {/* Hiển thị các blog tiếp theo */}
              {blogs.slice(1).map((blog, index) => (
                <Grid item xs={6} key={index} height={680}>
                  <BlogItem key={blog.id} blog={blog} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Blogs;
