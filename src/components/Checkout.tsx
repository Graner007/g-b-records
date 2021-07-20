import { Component } from 'react';
import { Form, Input, Cascader, Row, Col, Checkbox, Button, Layout } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";

import { H1, Content, Header } from "./Styles";
import { UserModel } from "../components/interface/UserModel";
import { StatusCodeModel } from "../components/interface/StatusCodeModel";
import ErrorPage from "../components/warning/ErrorPage";
import Loading from "../components/warning/Loading";
import ListCart from "./ListCart";
import { LoginCtx } from "../context/LoginContext";

type State = {
    user: UserModel;
    loading: boolean;
    error: boolean;
    statusCode: StatusCodeModel;
}

type FormValues = {
    firstName: string;
    lastName: string;
    address: string;
    zipcode: number;
    country: string;
    phoneNumber: string;
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

    finish(values: FormValues) {}

    render() {
        const countries = [
            {
              value: 'hungary',
              label: 'Hungary',
            },
            {
              value: 'unitedKingdom',
              label: 'United Kingdom',
            },
            {
                value: 'usa',
                label: "USA"
            }
        ];

    if (this.state.error) {
        return (
            <ErrorPage status={this.state.statusCode.code} />
        )
    }

    return (
        <Layout>
            <Content padding={50}>
                <Row justify="end" gutter={24}>
                    <Col span={12}>
                        <Header backgroundColor="inherit" textAlign="center"><H1 bold={true}>Checkout</H1></Header>
                        {this.state.loading ? <Loading size={35} /> :
                        <Form
                            name="checkout"
                            scrollToFirstError
                            wrapperCol={{ sm: { span: 6, offset: 12 },
                                        xs: { span: 6, offset: 12 }
                            }}
                            initialValues={{
                                firstName: this.state.user.name.split(" ")[0],
                                lastName: this.state.user.name.split(" ")[1],
                                address: this.state.user.address,
                                zipcode: this.state.user.zipcode,
                                country: [this.state.user.country],
                                phone: this.state.user.phoneNumber
                            }}
                            onFinish={this.finish}
                            >
                            <Form.Item
                                name="firstName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your First name!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="First name" type="text" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your lastname!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Last name" type="text" />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                    whitespace: true,
                                },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Address" type="text" />
                            </Form.Item>

                            <Form.Item
                                name="zipcode"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input zipcode!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Zipcode" type="number" step={10} />
                            </Form.Item>

                            <Form.Item
                                name="country"
                                rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select your country!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Cascader options={countries} />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Phone Number" type="tel" />
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                {
                                    validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                                ]}
                            >
                                <Checkbox>
                                I have read the <Link to="">agreement</Link>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Payment</Button>
                            </Form.Item>
                        </Form>}
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