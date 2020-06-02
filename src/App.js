import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/checkout/checkout'
import {Route,Switch} from 'react-router-dom'
import Orders from './container/Orders/Orders'
import Auth from './container/Auth/Auth'
function App() {
  return (
    <div >
      <Layout>
      <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="/auth" component={Auth}/>
      </Switch>
      </Layout>
    </div>
  );
}

export default App;
