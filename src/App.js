import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Burger from './components/Burger/Burger'

function App() {
  return (
    <div >
      <Layout>
      <BurgerBuilder/>
      <Burger/>
      </Layout>
    </div>
  );
}

export default App;
