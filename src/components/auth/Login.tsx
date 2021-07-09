import { Form, Input, Button, Row, Col, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const Login = () => {

    const onFinish = (values: any[]) => {
        console.log('Received values of form: ', values);
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
                    name="username"
                    style={{width: "50%"}}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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

export default Login
