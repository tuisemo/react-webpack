import axios from 'axios';

const request = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor(请求拦截器)
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    const { headers } = config;
    headers['Cache-Control'] = 'no-cache';
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor(响应拦截器)
request.interceptors.response.use(
  response => response.data,
  error => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
