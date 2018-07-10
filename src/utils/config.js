/**
 * config
 * create by lqy 2018/1/31
 */

var apiHost = `${window.location.protocol}//${window.location.host}/api/`;

if (process.env.NODE_ENV === 'development') {
  console.log('开发');
} else {
  console.log('生产');
    apiHost = "http://47.92.6.41:5200/";
}

export default {
  apiHost,
};
