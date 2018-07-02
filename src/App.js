import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch  } from 'react-router-dom';
import Loadable from 'react-loadable';

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

export default App;
