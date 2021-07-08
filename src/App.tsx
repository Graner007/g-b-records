import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import RecordList from "./components/RecordList";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header" style={{backgroundColor: '#fff'}}>
          <Navbar />
        </Header>
        <Content style={{ overflow: 'initial' , padding: "24px", backgroundColor: "#fff"}}>
          <RecordList />
        </Content>
      </Layout>
    </div>
  );
}

export default App;