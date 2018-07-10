import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import home from './api/home'
import { getArms } from './store/actions/gunfire-actions'

const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

const Home = Loadable({
  loader: () => import('./views/home/index'),
  loading: loadingComponent
});

const Cart = Loadable({
  loader: () => import('./views/cart/index'),
  loading: loadingComponent
});

class App extends Component {
  componentDidMount() {
    // 获取导航列表
    home.getNavList().then(res => {
      if (res.data.code === 200) {
        const data = res.data.data;
        this.props.getArms(data);
      }
    });
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Switch>
              <Route path='/'  component={Home} exact></Route>
              <Route path='/cart' exact component={Cart}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// export default App;

export default connect(state => ({
  gunfire: state.gunfireReducer.gunfire,
}), {
  getArms,
})(App);
