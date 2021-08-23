import { Form, Input, Button, Row, Col, Space, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
import { useState } from "react";
import Cookies from 'universal-cookie';

import { Header, H1 } from '../Styles';
import { UserModel } from '../interface/UserModel';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
          id
          email
      }
    }
  }
`;

type AuthPayload = {
    login: {
        token: string;
        user: UserModel;
    }
}
 
type UserDetails = {
    email: string;
    password: string;
}

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [login, { error }] = useMutation<AuthPayload, UserDetails>(
        LOGIN, 
        { 
            variables: { email: email, password: password },
            onCompleted: (data: AuthPayload) => {
                message.success("Successful login");
                setEmail("");
                setPassword("");
                const token = data.login.token;
                const cookies = new Cookies();
                cookies.set('token', `Bearer ${token}`, { path: "/", httpOnly: true });
                history.push("/");
            },
            onError: () => {}
        }
    );
    
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
                >

                    <Header textAlign="center"><H1 bold={true}>Sign in</H1></Header><br /><br />

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
                    <Input 
                        prefix={<UserOutlined 
                        className="site-form-item-icon" />} 
                        placeholder="Email" 
                        onChange={e => setEmail(e.target.value)} />
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
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>

                {error && <Alert message={error.message} type="error" showIcon style={{width: "75%", marginBottom: 20}} />}
            
                <Form.Item>
                    <Space direction="horizontal" size="small">
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => email && password && login()}>Sign in</Button>
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