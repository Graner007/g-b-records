import { Component } from 'react';
import { Row, Col } from 'antd';
import axios from "axios";

import { H1, Content, Header, Layout } from "../Styles";
import { UserModel } from "../interface/UserModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import ErrorPage from "../warning/ErrorPage";
import Loading from "../warning/Loading";
import AddressForm from "../partials/AddressForm";
import { LoginCtx } from "../../context/LoginContext";
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
                <Header>
                    <PaymentStep currentIndex={1} />
                </Header>
                <Content>
                    <Row justify="end" gutter={24}>
                        <Col span={12}>
                            <Header backgroundcolor="inherit" textalign="center">
                                <H1 bold={true}>Checkout</H1>
                            </Header>
                                {/* <AddressForm 
                                    firstName={this.state.user.firstName} 
                                    lastName={this.state.user.lastName} 
                                    address={this.state.user.address}
                                    zipcode={this.state.user.zipcode}
                                    country={this.state.user.country}
                                    phoneNumber={this.state.user.telephone}
                                    isAgreement={true}
                                    isButton={true}
                                /> */}
                        </Col>
                        <Col span={12}>
                            <Header backgroundcolor="inherit" textalign="center"><H1 bold={true}>Cart</H1></Header>
                            {/* <ListCart cart={ this.state.user.cart } editable={false} /> */}
                        </Col>
                    </Row> 
                </Content>
            </Layout>  
    )}
}