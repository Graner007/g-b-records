import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import SubMenuWithListContent from "./components/SubMenuWithListContent";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
              <Route path="/" exact>
              </Route>
            </Content>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;