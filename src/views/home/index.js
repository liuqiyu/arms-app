import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/menu/Menu';
import Carousel from './../../components/carousel/carousel';
import { addToCart } from './../../actions/cart-actions'


class Page1 extends Component {
  componentDidMount() {
    // console.log(this.props.gunfire)
  }
  
  render () {
    return (
      <div>
        <Menu></Menu>
        <div className="app-content">
          <Carousel></Carousel>
          <div className="app-box">
          
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
})(Page1);