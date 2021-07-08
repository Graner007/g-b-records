import React from 'react'
import  { Layout } from "antd";
import RecordList from "./RecordList";
import SearchBar from "./navbar/SearchBar";
import { useParams } from "react-router-dom";

type Props = {
    title: string;
}

interface RouteParams {
    name: string; 
}

const SubMenuWithListContent = ({title}: Props) => {

    const { Header, Sider, Content } = Layout;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");

    return (
        <Layout>
            <Sider theme="light">
                <h3>Filters</h3>
                <h4>{title}</h4>
                <SearchBar placeholder={title.toLowerCase()} size="small" width="75%" padding="10px 0 10px 0" />
                <p>{displayName}</p>
            </Sider>
            <Layout>
                <Header className="header" style={{backgroundColor: '#fff'}}>
                    <h4>Home {'>'} {displayName}</h4>
                </Header>
                <Content style={{padding: 24}}>
                    <RecordList name={name} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default SubMenuWithListContent;