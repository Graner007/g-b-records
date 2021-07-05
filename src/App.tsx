import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header" style={{backgroundColor: '#fff'}}>
          <Navbar />
        </Header>
      </Layout>
    </div>
  );
}

export default App;