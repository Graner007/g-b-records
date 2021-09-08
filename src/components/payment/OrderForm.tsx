import { Form, Input, Cascader, Checkbox, Button, message} from 'antd';
import { Link } from "react-router-dom";
import { ApolloError, gql, useMutation, useLazyQuery } from '@apollo/client';

import { countries, Country } from '../partials/Countires';
import { CheckoutDetailModel } from '../interface/CheckoutDetailModel';

const ADD_CHECKOUT_DETAIL_MUTATION = gql`
    mutation AddCheckoutDetail(
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $address: String!,
        $zipcode: Int!,
        $country: String!,
        $telephone: String!
    ) {
        addCheckoutDetail(
            firstName: $firstName, 
            lastName: $lastName,
            email: $email,
            address: $address,
            zipcode: $zipcode,
            country: $country,
            telephone: $telephone
        ) {
            firstName
        }
    }
`;

const CREATE_PAYMENT_SESSION = gql`
    query CreatePaymentSession {
        createPaymentSession {
            url
        }
    }
`;

type AddCheckoutDetailType = {
    addCheckoutDetail: CheckoutDetailModel;
}

type CreatePaymentSessionType = {
    createPaymentSession: {
        url: string;
    }
}

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    zipcode: number;
    country: string;
    telephone: string;
}

let allCountries: Country[] = [];

const getCountries = () => {
    countries()
        .then(res => allCountries = res)
        .catch(err => console.error(err));
}

getCountries();

const OrderForm = (props: Props) => {
    const [createPaymentSession] = useLazyQuery<CreatePaymentSessionType, {}>(
        CREATE_PAYMENT_SESSION, 
        {
            onCompleted: (data: CreatePaymentSessionType) => {
               document.location.href = data.createPaymentSession.url;
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    const [addCheckoutDetail] = useMutation<AddCheckoutDetailType, Props>(
        ADD_CHECKOUT_DETAIL_MUTATION, 
        {
            onCompleted: () => {
               createPaymentSession();
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    return (
        <Form
            name="checkout"
            scrollToFirstError
            initialValues={{
                firstName: props.firstName,
                lastName: props.lastName,
                email: props.email,
                address: props.address,
                zipcode: props.zipcode,
                country: [props.country],
                telephone: props.telephone
            }}
            onFinish={(values: Props) => {
                addCheckoutDetail({ 
                    variables: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        address: values.address,
                        zipcode: values.zipcode,
                        country: values.country[0],
                        telephone: values.telephone
                    }
                })
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
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}
                hasFeedback
            >
                <Input placeholder="Email" type="email" />
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
                name="telephone"
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
        </Form>
    )
}

export default OrderForm;