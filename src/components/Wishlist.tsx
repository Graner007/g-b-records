import { Component } from 'react';
import { Button, Row, Col } from "antd";
import axios from "axios"; 

import { Layout, Content, Header, H1 } from "./Styles";
import ErrorPage from "../components/warning/ErrorPage";
import Loading from "../components/warning/Loading";
import RecordList from './record/RecordList';
import { UserModel } from "../components/interface/UserModel";
import { StatusCodeModel } from "../components/interface/StatusCodeModel";
import { LoginCtx } from "../context/LoginContext";

type State = {
    user: UserModel;
    loading: boolean;
    error: boolean;
    statusCode: StatusCodeModel;
}

export default class Wishlist extends Component {

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
                <Layout padding="2% 15% 15% 15%">
                    <Header>
                        <Row gutter={24}>
                            <Col span={12}><H1 bold={true}>Wish List</H1></Col>
                            <Col span={12} push={8}><Button type="primary">ADD ALL TO CART</Button></Col>
                        </Row>
                    </Header>
                    <Content padding="3%">
                        <RecordList records={this.state.user.wishList} maxWidth={200} isWishlist={true} />
                    </Content>
                </Layout>
        )
    }
}