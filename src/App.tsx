import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Content, Header } from './components/Styles';
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/auth/Registration";
import Record from "./components/record/Record";
import Footer from './components/Footer';
import ErrorPage from "./components/warning/ErrorPage";
import Login from "./components/auth/Login";
import Cart from "./components/Cart";
import MyAccount from "./components/MyAccount";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import LoginProvider from "./context/LoginContext";
import RecordListByCategory from './components/record/RecordListByCategory';
import Wishlist from './components/Wishlist';

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