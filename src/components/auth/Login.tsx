import { Form, Input, Button, Row, Col, Space, Alert } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import { UserModel } from '../interface/UserModel';

type LoginForm = {
    email: string;
    password: string;
}

const Login = () => {

    const [users, setUsers] = React.useState<UserModel[]>({} as UserModel[]);
    const [error, setError] = React.useState<boolean>(false);
    const history = useHistory();

    const onFinish = (values: LoginForm) => {

        axios.get(process.env.PUBLIC_URL + '/data/user.json')
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data);
                    
                    const user = users.find(user => user.email === values.email && user.password === values.password);

                    if (user) {
                        setError(false);
                        localStorage.setItem("email", user.email);
                        history.push("/");
                    }
                    else {
                        setError(true);
                    }
                }
            })
            .catch(err => {
                setError(true);
            });
    };
    
    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                    <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >

                    <Header style={{backgroundColor: "#fff", textAlign: "center", fontSize: 25}} className="header"><b>Sign in</b></Header><br /><br />

                <Form.Item
                    name="email"
                    style={{width: "50%"}}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    style={{width: "50%"}}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>

                {error ? <Alert message="Authentication Failed" type="error" showIcon style={{width: "75%", marginBottom: 20}} /> : null}
            
                <Form.Item>
                    <Space direction="horizontal" size="small">
                        <Button type="primary" htmlType="submit" className="login-form-button">Sign in</Button>
                        Or<Link to="/registration">Register now!</Link>
                    </Space>
                </Form.Item>
                </Form>
            </Col>
            <Col span={8}></Col>
        </Row>
    )
}

export default Login;