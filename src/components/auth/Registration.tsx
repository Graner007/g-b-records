import { Form, Input, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';

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

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            scrollToFirstError
            >

            <Header style={{backgroundColor: "#fff", textAlign: "center", fontSize: 25}} className="header"><b>Create an Account</b></Header><br /><br />

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
                <Input />
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
                <Input.Password />
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
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Registration;