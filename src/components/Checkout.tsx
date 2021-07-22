import { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import axios from "axios";

import { H1, Content, Header } from "./Styles";
import { UserModel } from "../components/interface/UserModel";
import { StatusCodeModel } from "../components/interface/StatusCodeModel";
import ErrorPage from "../components/warning/ErrorPage";
import Loading from "../components/warning/Loading";
import ListCart from "./ListCart";
import AddressForm from "./AddressForm";
import { LoginCtx } from "../context/LoginContext";
import PaymentStep from "./PaymentStep";

type State = {
    user: UserModel;
    loading: boolean;
    error: boolean;
    statusCode: StatusCodeModel;
}

export default class Checkout extends Component {

    static contextType = LoginCtx;

    state: State = {
        user: {} as UserModel,
        loading: true,
        error: false,
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
                <Header padding="2% 15% 3% 15%">
                    <PaymentStep currentIndex={1} />
                </Header>
                <Content padding="2% 15% 3% 15%">
                    <Row justify="end" gutter={24}>
                        <Col span={12}>
                            <Header backgroundColor="inherit" textAlign="center">
                                <H1 bold={true}>Checkout</H1>
                            </Header>
                                <AddressForm 
                                    firstName={this.state.user.name.split(" ")[0]} 
                                    lastName={this.state.user.name.split(" ")[1]} 
                                    address={this.state.user.address}
                                    zipcode={this.state.user.zipcode}
                                    country={this.state.user.country}
                                    isAgreement={true}
                                    isButton={true}
                                />
                        </Col>
                        <Col span={12}>
                            <Header backgroundColor="inherit" textAlign="center"><H1 bold={true}>Cart</H1></Header>
                            <ListCart cart={ this.state.user.cart } editable={false} />
                        </Col>
                    </Row> 
                </Content>
            </Layout>  
    )}
}