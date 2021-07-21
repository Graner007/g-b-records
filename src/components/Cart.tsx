import { Component } from 'react';
import  { Layout, Button, Row, Col } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import { Content, Header } from './Styles';
import { UserModel } from "../components/interface/UserModel";
import Loading from "./warning/Loading";
import ErrorPage from "./warning/ErrorPage";
import ListCart from "./ListCart";
import { LoginCtx } from "../context/LoginContext";
 
type State = {
    users: UserModel[];
    user: UserModel;
    error: false;
    loading: boolean;
    statusCode: "404" | "500" | "403";
}

export default class Cart extends Component {

    static contextType = LoginCtx;

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

                    const user = this.state.users.find(user => user.email === this.context.state.email);

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

        if (this.state.error) {
            <ErrorPage status={this.state.statusCode} />
        }

        return (
            <Layout>
                <Header padding="0 15% 0 15%">
                    <Row>
                        <Col span={12}><h1 style={{fontSize: 30}}>Your Cart</h1></Col>
                        <Col span={12}><Button size="large" type="primary" style={{float: "right", marginTop: 15}}><Link to="/checkout">Checkout</Link></Button></Col>
                    </Row>
                </Header>
                <Content padding="2% 15% 3% 15%">
                    {this.state.loading ? <Loading size={35} /> : <ListCart cart={this.state.user.cart} editable={true} />}
                </Content>
            </Layout>        
        )
    }
}