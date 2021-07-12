import React, { Component } from 'react';
import  { Layout, Button, Row, Col, List, InputNumber, Avatar } from "antd";
import { UserModel } from "../components/interface/UserModel";
import axios from "axios";
import { DeleteFilled } from '@ant-design/icons';

type State = {
    users: UserModel[];
    user: UserModel;
    error: false;
    loading: boolean;
}

export default class Cart extends Component {

    state: State = {
        users: [] as UserModel[],
        user: {} as UserModel,
        error: false,
        loading: true
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + '/data/user.json')
            .then(res => {
                if (res.status === 200) {
                    this.setState({users: res.data});

                    const user = this.state.users.find(user => user.email === localStorage.getItem("email"));

                    if (user) {
                        this.setState({loading: false, error: false, user: user});
                    }
                    else {
                        this.setState({loading: false, error: true});
                    }
                }
            })
            .catch(err => this.setState({ error: true, loading: false }));
    }

    render() {

        const { Header, Content } = Layout;

        return (
            <Layout>
                <Header className="header" style={{backgroundColor: '#fff', padding: "0 40px 0 40px"}}>
                    <Row>
                        <Col span={12}><h1 style={{fontSize: 30}}>Your Cart</h1></Col>
                        <Col span={12}><Button size="large" type="primary" style={{float: "right", marginTop: 15}}>Checkout</Button></Col>
                    </Row>
                </Header>
                <Content style={{padding: 50, backgroundColor: 'white'}}>
                {this.state.error ? <div>Can't be loaded!</div> : (this.state.loading ? <div>Loading...</div> : <List
                        itemLayout="horizontal"
                        dataSource={this.state.user.cart}
                        size="large"
                        renderItem={item => (
                        <List.Item
                            actions={[<p style={{fontSize: 22}} key="price">{item.price * item.quantity}$</p>, <DeleteFilled style={{fontSize: 22}} />]}
                        >
                            <List.Item.Meta
                                title={item.name}
                                description={item.artist}
                                avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                            />
                            <InputNumber min={0} defaultValue={item.quantity} size="large" />
                        </List.Item>
                        )}
                    />)}
                    
                </Content>
            </Layout>        
            )
    }
}