import axios from 'axios';
import config from './../utils/config';

const instance = axios.create({
  baseURL: config.apiHost
});

console.log(config.apiHost);

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 10002 登录过期
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});

export default instance
