import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

import { Content, Header } from './Styles';
import Navbar from "./navbar/Navbar";
import Registration from "./auth/Registration";
import Record from "./record/Record";
import Footer from './partials/Footer';
import ErrorPage from "./warning/ErrorPage";
import Login from "./auth/Login";
import Cart from "./user/cart/Cart";
import MyAccount from "./user/MyAccount";
import OrderDetails from "./user/order/OrderDetails";
import Orders from "./user/order/Orders";
import Home from "./home/Home";
import Checkout from "./payment/Checkout";
import SuccessfulPayment from "./payment/SuccessfulPayment";
import RecordListByCategory from './record/RecordListByCategory';
import Wishlist from './user/Wishlist';

function App() {
  return (
    <Router>
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
              <Route path="/products/:name" exact>
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
              <Route path="/orders/:id" exact>
                <OrderDetails />
              </Route>
              <Route path="/orders" exact>
                <Orders />
              </Route>
              <Route path="/checkout" exact>
                <Checkout />
              </Route> 
              <Route path="/wishlist" exact>
                <Wishlist />
              </Route>
              <Route path="/successful-payment" exact>
                <SuccessfulPayment />
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
    </Router>
  );
}

export default App;