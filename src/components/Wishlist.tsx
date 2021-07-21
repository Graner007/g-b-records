import { Component } from 'react';
import { Button, Row, Col } from "antd";

import { Layout, Content, Header, H1 } from "./Styles";

export default class Wishlist extends Component {
    render() {
        return (
            <Layout padding="2% 15% 15% 15%">
                <Header>
                    <Row gutter={24}>
                        <Col span={12}><H1 bold={true}>Wish List</H1></Col>
                        <Col span={12} push={8}><Button type="primary">ADD ALL TO CART</Button></Col>
                    </Row>
                </Header>
                <Content>

                </Content>
            </Layout>
        )
    }
}