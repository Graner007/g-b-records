import React, { Component } from 'react';
import { Row, Col, Image } from "antd";
import { Link } from "react-router-dom";

import { Layout, Content, Header, H1 } from "./Styles";

export default class Decades extends Component {
    render() {
        return (
            <Layout>
                <Header textAlign="center" margin={30}>
                    <H1 bold={true}>Shop by Decade</H1>
                </Header>
                <Content>
                    <Row gutter={16} justify="center">
                        <Col span={8}><Link to="/collections/50's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0000_1950_998x474.png?v=1618867950" preview={false} /></Link></Col>
                        <Col span={8}><Link to="/collections/60's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0001_1960_998x474.png?v=1618867978" preview={false} /></Link></Col>
                    </Row>
                    <Row gutter={16} justify="center">
                        <Col span={8}><Link to="/collections/70's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0002_1970_1000x475.png?v=1618868017" preview={false} /></Link></Col>
                        <Col span={8}><Link to="/collections/80's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0003_1980_1000x475.png?v=1618868031" preview={false} /></Link></Col>
                    </Row>
                    <Row gutter={16} justify="center">
                        <Col span={8}><Link to="/collections/90's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0004_1990_1000x475.png?v=1618868050" preview={false} /></Link></Col>
                        <Col span={8}><Link to="/collections/00's"><Image src="https://cdn.shopify.com/s/files/1/0287/4323/7725/files/TSOV_1119-Evergreen-Banners_GRID_0005_2000_1000x475.png?v=1618868089" preview={false} /></Link></Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}