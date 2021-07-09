import React from 'react';
import Navbar from "./components/navbar/Navbar";
import SubMenuWithListContent from "./components/SubMenuWithListContent";
import RecordModel from "./components/Record";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Header className="header" style={{backgroundColor: '#fff'}}>
            <Navbar />
          </Header>
          <Switch>
            <Content style={{ overflow: 'initial' , padding: "24px", backgroundColor: "#fff"}}>
              <Route path="/collections/:name" exact>
                <SubMenuWithListContent title="Artist" />
              </Route>
              <Route path="/products/:name" exact>
                <RecordModel />
              </Route>
              <Route path="/" exact>
              </Route>
            </Content>
          </Switch>
          <Footer />
        </Layout>
      </div>
    </Router>
  );
}

export default App;