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
import { StatusCodeModel } from "../components/interface/StatusCodeModel";
 
type State = {
    user: UserModel;
    error: boolean;
    loading: boolean;
    statusCode: StatusCodeModel;
}

export default class Cart extends Component {

    static contextType = LoginCtx;

    state: State = {
        user: {} as UserModel,
        error: false,
        loading: true,
        statusCode: {} as StatusCodeModel
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + '/data/user.json')
            .then(res => {
                if (res.status === 200) {
                    let data: UserModel[] = [];
                    data = res.data;

                    const user = data.find(user => user.email === this.context.state.email);

                    if (user) { this.setState({user: user, loading: false, error: false, statusCode: {} as StatusCodeModel}); }
                    else { this.setState({loading: false, error: true, statusCode: {code: "403"}}); }
                }
            })
            .catch(err => {
                console.log(err.response.status);
                switch (err.response.status) {
                    case 403:
                        this.setState({loading: false, error: true, statusCode: {code: "403"}});
                        break; 
                    case 404:
                        this.setState({loading: false, error: true, statusCode: {code: "404"}});
                        break;
                    case 500:
                        this.setState({loading: false, error: true, statusCode: {code: "500"}});                     
                        break;
                    default:
                        break;
                }
            });
    }

    render() {

        if (this.state.error) {
            <ErrorPage status={this.state.statusCode.code} />
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
                    { this.state.loading ? <Loading size={35} /> : <ListCart cart={this.state.user.cart ? this.state.user.cart : []} editable={true} /> }
                </Content>
            </Layout>        
        )
    }
}