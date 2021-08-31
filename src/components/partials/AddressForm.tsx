import { Component } from 'react'
import { Form, Input, Cascader, Checkbox, Button} from 'antd';
import { Link } from "react-router-dom";

import { countries, Country } from "./Countires";

type Props = {
    firstName: string;
    lastName: string;
    address: string;
    zipcode: number;
    country: string;
    phoneNumber: string;
    isAgreement: boolean;
    isButton: boolean;
}

let allCountries: Country[] = [];

const getCountries = () => {
    countries()
        .then(res => allCountries = res)
        .catch(err => console.error(err));
}

getCountries();

export default class AddressForm extends Component<Props> {
    render() {
        return (
            <Form
                name="checkout"
                scrollToFirstError
                /* wrapperCol={{ sm: { span: 6, offset: 12 },
                            xs: { span: 6, offset: 12 }
                }} */
                initialValues={{
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    address: this.props.address,
                    zipcode: this.props.zipcode,
                    country: [this.props.country],
                    phone: this.props.phoneNumber
                }}
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
                    <Cascader options={allCountries} />
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

                {this.props.isAgreement ? <Form.Item
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
                </Form.Item> : null}
                {this.props.isButton ? <Form.Item>
                    <Button type="primary" htmlType="submit"><Link to="/payment">Payment</Link></Button>
                </Form.Item> : null}
            </Form>
        )
    }
}