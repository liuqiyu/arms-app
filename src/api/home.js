/**
 * home
 * create by lqy 2018/4/29
 */
import api from './index';

const path = {
  navList: '/arms/navList',
  dataList: '/arms/dataList',
  bannerList: '/arms/bannerList',
};

const getNavList = () => api.get(path.navList);

const getDataList = (page, count, form) => api.get(path.dataList, {
  params: {
    page,
    count,
    type_id: form.type_id,
    id: form.id,
  }
});

const getBannerList = () => api.get(path.bannerList);

export default {
  getNavList,
  getDataList,
  getBannerList
};