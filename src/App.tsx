import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

import { Content, Header } from './components/Styles';
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/auth/Registration";
import Record from "./components/record/Record";
import Footer from './components/partials/Footer';
import ErrorPage from "./components/warning/ErrorPage";
import Login from "./components/auth/Login";
import Cart from "./components/user/cart/Cart";
import MyAccount from "./components/user/MyAccount";
import OrderDetails from "./components/user/order/OrderDetails";
import Home from "./components/home/Home";
import Checkout from "./components/payment/Checkout";
import LoginProvider from "./context/LoginContext";
import RecordListByCategory from './components/record/RecordListByCategory';
import Wishlist from './components/user/Wishlist';

function App() {
  return (
    <Router>
      <LoginProvider>
        <div className="App">
          <Layout>
            <Header>
              <Navbar />
            </Header>
              <Content padding="30px 0 30px 0">
              <Switch>
                <Route path="/collections/:name" exact>
                  <RecordListByCategory />
                </Route>
                <Route path="/products/:id" exact>
                  <Record />
                </Route>
                <Route path="/registration" exact>
                  <Registration />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/cart" exact>
                  <Cart />
                </Route>
                <Route path="/log-out" exact render={() => {
                  return <Redirect to="/" />;
                }}>
                </Route>
                <Route path="/my-account" exact>
                  <MyAccount />
                </Route>
                <Route path="/orders/:id" exact >
                  <OrderDetails />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout />
                </Route> 
                <Route path="/wishlist" exact>
                  <Wishlist />
                </Route>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="*" exact>
                  <ErrorPage status="404" />
                </Route>
              </Switch>
              </Content>
            <Footer />
          </Layout>
        </div>
      </LoginProvider>
    </Router>
  );
}

export default App;