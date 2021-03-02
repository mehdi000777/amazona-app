import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import ProductDtails from './Pages/ProductDtails';
import { Route, Switch } from 'react-router-dom';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import Shipping from './Pages/Shipping';
import Payment from './Pages/Payment';
import PlaceOrder from './Pages/PlaceOrder';
import OrderDetails from './Pages/OrderDetails';
import OrderHistory from './Pages/OrderHistory';
import Profile from './Pages/Profile';
import PrivateRoute from './Componentes/PrivateRoute';
import ProductList from './Pages/ProductList';
import PrivateRouteAdmin from './Componentes/PrivateRouteAdmin';
import AddProduct from './Pages/AddProduct';
import EditPorduct from './Pages/EditPorduct';
import OrderList from './Pages/OrderList';
import UserList from './Pages/UserList';
import UserEdit from './Pages/UserEdit';
import SellerRouter from './Componentes/SellerRoute';
import Seller from './Pages/Seller';
import Search from './Pages/Search';
import MapPage from './Pages/Map';

function App() {
  return (
    <div className="grid-container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDtails} />
        <Route exact path="/product/:id/edit" component={EditPorduct} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
        <PrivateRouteAdmin path="/userlist" component={UserList} />
        <PrivateRouteAdmin path="/user/:id/edit" component={UserEdit} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/order/:id" component={OrderDetails} />
        <Route path="/orderhistory" component={OrderHistory} />
        <PrivateRouteAdmin exact path="/orderlist" component={OrderList} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRouteAdmin exact path="/productlist" component={ProductList} />
        <Route exact path="/AddProduct" component={AddProduct} />
        <Route path="/cart/:id?" component={Cart} />
        <SellerRouter path="/productlist/seller" component={ProductList} />
        <SellerRouter path="/orderlist/seller" component={OrderList} />
        <Route path="/seller/:id" component={Seller} />
        <Route exact path="/search/name/:name?" component={Search} />
        <Route exact path="/search/category/:category?" component={Search} />
        <Route exact path="/search/category/:category/name/:name" component={Search} />
        <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
          component={Search} />
        <PrivateRoute path="/map" component={MapPage} />
        <PrivateRouteAdmin exact path="/productlist/pageNumber/:pageNumber" component={ProductList} />
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
