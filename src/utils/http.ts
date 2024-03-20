import axios, { AxiosError, type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import HttpStatusCode from 'src/constants/httpStatusCodeEnnum.enum';

class Http {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static post(arg0: string, _body: { email: string; password: string }) {
    throw new Error('Method not implemented.');
  }
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-type': 'application/json'
      }
    });
    this.instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response?.data !== HttpStatusCode.UnprocessableEntity) {
          const data: any = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
