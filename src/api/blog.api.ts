import axios from 'axios';
import { BlogList } from 'src/types/blog.type';

const request = axios.create({
  baseURL:
    'https://www.googleapis.com/blogger/v3/blogs/4669001375551211765/posts?key=AIzaSyClYCBVAbMkK6MmQ24pf8lgJlbsSciNbY8&fetchImages=true'
});

const blogApi = {
  getBlogList: () => {
    return request.get<BlogList>('');
  },
  getBlogPostDetail(id: number) {
    return request.get(`/blog/${id}`);
  },
  createBlog(body: any) {
    return request.post('/blog', body);
  },
  updateBlog(id: number, body: any) {
    return request.put(`/blog/${id}`, body);
  },
  deleteBlog(id: number) {
    return request.delete(`/blog/${id}`);
  }
};
export default blogApi;
