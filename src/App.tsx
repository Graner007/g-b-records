import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { RecordContextProvider } from './context/RecordContext';
import { ArtistContextProvider } from './context/ArtistContext';
import { GenreContextProvider } from './context/GenreContext';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <RecordContextProvider>
      <ArtistContextProvider>
      <GenreContextProvider>
      <UserContextProvider> 
        <Layout>
          <Header className="header" style={{backgroundColor: '#fff'}}>
            <Navbar />
          </Header>
        </Layout>
      </UserContextProvider>  
      </GenreContextProvider>  
      </ArtistContextProvider>  
      </RecordContextProvider>
    </div>
  );
}

export default App;