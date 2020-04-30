import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/checkout/checkout'
import {Route,Switch} from 'react-router-dom'
import Orders from './container/Orders/Orders'
function App() {
  return (
    <div >
      <Layout>
      <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/checkout" component={Checkout}/>

      </Switch>
      </Layout>
    </div>
  );
}

export default App;
