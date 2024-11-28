
import React, { useEffect } from 'react';
import './styles.css';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Route, Switch } from 'wouter';
import ProductsPage from './ProductsPage';
import RegisterPage from './RegisterPage';
import { useFlashMessage } from './FlashMessageStore';
import ShoppingCart from './ShoppingCart';
import UserLogin from "./UserLogin"




function App() {
  const { getMessage, clearMessage } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {

    const timer = setTimeout(() => {
      clearMessage();
    }
      , 3000);
    return () => {
      clearTimeout(timer);
    };
  }
    , [flashMessage]);


  return (
    <>
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={UserLogin} />
        <Route path="/cart" component={ShoppingCart} />
      </Switch>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Zeffyr's Cupcakes. All rights reserved.</p>
        </div>
      </footer>



    </>
  )
}

export default App;