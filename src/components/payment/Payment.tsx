import { Component } from 'react';
import { Row, Col, Space } from "antd";
import axios from 'axios';

import { Layout, Header, Content, H1 } from "../Styles";
import PaymentStep from "./PaymentStep";
import { UserModel } from '../interface/UserModel';
import { StatusCodeModel } from '../interface/StatusCodeModel';
import { LoginCtx } from '../../context/LoginContext';
import ErrorPage from '../warning/ErrorPage';
import InformationTable from './InformationTable';
import PaymentTable from './PaymentTable';
import ListCart from '../user/cart/ListCart';
import Loading from '../warning/Loading';

type State = {
    user: UserModel;
    error: boolean;
    loading: boolean;
    statusCode: StatusCodeModel;
}

export default class Payment extends Component {
    
    static contextType = LoginCtx;

    state: State = {
        user: {} as UserModel,
        error: false,
        loading: true,
        statusCode: {} as StatusCodeModel
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + "/data/user.json")
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
            return (
                <ErrorPage status={this.state.statusCode.code} />
            )
        }
        
        return (
            this.state.loading ? <Loading size={35} /> :
                <Layout>
                    <Header textalign="center">
                        <PaymentStep currentIndex={2} />
                    </Header>
                    <Content>
                        <Row justify="center" gutter={24}>
                            <Col span={12}>
                                <Space direction="vertical" size="large">
                                    <H1 bold={true} textalign="center">Payment</H1>
                                    <PaymentTable />
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical" size="large">
                                    <H1 bold={true} textalign="center">Shipment</H1>
                                    <InformationTable user={this.state.user} />
                                    <H1 bold={true} textalign="center">Cart</H1>
                                    <ListCart cart={this.state.user.cart} editable={false} />
                                </Space>
                            </Col>
                        </Row> 
                    </Content>
                </Layout>
        )
    }
}