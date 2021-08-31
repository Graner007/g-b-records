import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Input, Button, message, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

import { Header, H1 } from '../Styles';
import { UserModel } from '../interface/UserModel';

const REGISTER = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

type AuthPayload = {
    signup: {
        token: string;
        user: UserModel;
    }
}

type NewUserDetails = {
    email: string;
    password: string;
}

const formItemLayout = {
    labelCol: {
      xs: {
        span: 16,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 16,
      },
      sm: {
        span: 6,
      },
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 4,
        offset: 0,
        },
        sm: {
        span: 4,
        offset: 8,
        },
    }
};

const Registration = () => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const history = useHistory();

    const [signUp, { error }] = useMutation<AuthPayload, NewUserDetails>(
        REGISTER, 
        { 
            variables: { email: email, password: password },
            onCompleted: () => {
                message.success("Successful sign up");
                setEmail("");
                setPassword("");
                history.push("/");
            },
            onError: () => {}
        }
    );


    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            scrollToFirstError
            >

            <Header textalign="center"><H1 bold={true}>Create an Account</H1></Header><br /><br />

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input onChange={e => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={() => email && password && signUp()}>
                    Register
                </Button>
            </Form.Item>

            {error && <Alert message={error.message} type="error" showIcon style={{width: "75%", marginBottom: 20}} />}

        </Form>
    )
}

export default Registration;