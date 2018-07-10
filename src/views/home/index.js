import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NoticeBar } from 'antd-mobile';
import Menu from '../../components/menu/Menu';
import Carousel from './../../components/carousel/carousel';
import { addToCart } from '../../store/actions/cart-actions'
import List from './list';
import home from './../../api/home';


class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      bannerData: [],
    };
    this.getBannerList = this.getBannerList.bind(this);
  };

  componentDidMount() {
    this.getBannerList();
  };

  getBannerList() {
    home.getBannerList().then(res => {
      if (res.data.code === 200) {
        this.setState({
          bannerData: res.data.data,
        });
      }
    });
  };
  
  render () {
    return (
      <div>
        <Menu></Menu>
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          此站为虚拟的枪火库交易市场，如需使用请进入淘宝购买玩具儿童枪！
        </NoticeBar>
        <div className="app-content">
          <Carousel bannerData={this.state.bannerData}></Carousel>
          <div className="app-box">
            <List data={this.state.data}></List>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(state => ({
  gunfire: state.gunfireReducer.gunfire,
}), {
  addToCart,
})(Home);