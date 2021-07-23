import { Component } from 'react';
import { Form, Input, Button} from 'antd';

export default class CreditCardForm extends Component {
    render() {
        return (
            <Form
                name="payment"
                scrollToFirstError
                >
                <Form.Item
                    name="card-number"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your card number!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Card number" type="number" />
                </Form.Item>

                <Form.Item
                    name="card-holder"
                    rules={[
                    {
                        required: true,
                        message: 'Please input card holder!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Card holder" type="text" />
                </Form.Item>

                <Form.Item
                    name="Expiration-date"
                    rules={[
                    {
                        required: true,
                        message: 'Please input expiration date!',
                        whitespace: true,
                    },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Expiration date (MM/YY)" type="text" />
                </Form.Item>

                <Form.Item
                    name="cvc"
                    rules={[
                    {
                        required: true,
                        message: 'Please input card cvc!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="CVC" type="number" />
                </Form.Item>

                <Button type="primary" htmlType="submit">Pay now</Button>
            </Form>
        )
    }
}