import React, { Component } from 'react';
import  { Layout, Button, Row, Col, List, InputNumber, Avatar } from "antd";
import { UserModel } from "../components/interface/UserModel";
import axios from "axios";
import { DeleteFilled } from '@ant-design/icons';
import Loading from "./warning/Loading";
import Error from "./warning/Error";

type State = {
    users: UserModel[];
    user: UserModel;
    error: false;
    loading: boolean;
    statusCode: "404" | "500" | "403";
}

export default class Cart extends Component {

    state: State = {
        users: [] as UserModel[],
        user: {} as UserModel,
        error: false,
        loading: true,
        statusCode: "500"
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
                        this.setState({loading: false});
                    }
                }
            })
            .catch(err => {
                this.setState({ error: true, loading: false });
                switch (err.response.status) {
                    case 403:
                        this.setState({statusCode: '403'});
                        break;
                    case 404:
                        this.setState({statusCode: '404'});
                        break;
                    case 500:
                        this.setState({statusCode: '500'});
                        break;
                    default:
                        break;
                }
            });
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
                {this.state.error ? <Error status={this.state.statusCode} /> : (this.state.loading ? <Loading size={35} /> : <List
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