import React from "react";
import Header from "./commponents/Header";
import Footer from "./commponents/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screen/Homescreen";
import Productscreen from "./screen/Productscreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentScreen from "./screen//PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import UserEditscreen from "./screen/UserEditScreen";
import ProductEditscreen from "./screen/ProductEditScreen";
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/UserListScreen";
import ProductListScreen from "./screen/ProductListScreen";
import OrderListScreen from "./screen/OrderListScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/orders/:id" component={OrderScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/admin/userList" component={UserListScreen} />
              <Route path="/admin/productList" component={ProductListScreen} exact />
              <Route path="/admin/orderList" component={OrderListScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/product/:id" component={Productscreen} />
              <Route path="/admin/user/:id/edit" component={UserEditscreen} />
              <Route
                path="/admin/product/:id/edit"
                component={ProductEditscreen}
              />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/admin/productList/:pageNumber" component={ProductListScreen} exact/>
              <Route path='/search/:keyword' component={Homescreen} exact />
              <Route exact path="/page/:pageNumber" component={Homescreen} />
              <Route exact path="/search/:keyword/page/:pageNumber" component={Homescreen} />
              <Route exact path="/" component={Homescreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
