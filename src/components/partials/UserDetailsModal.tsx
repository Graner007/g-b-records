import { useState } from 'react';
import { Form, Input, Cascader, Button, Modal, message} from 'antd';
import { Link } from "react-router-dom";
import { ApolloError, gql, useMutation } from '@apollo/client';

import { countries, Country } from "./Countires";

const EDIT_USER_DETAILS_MUTATION = gql`
    mutation EditUserDetailsMutation(
        $firstName: String
        $lastName: String 
        $address: String 
        $zipcode: Int
        $telephone: String
        $country: String 
    ) {
        editUserDetails(
            firstName: $firstName
            lastName: $lastName
            address: $address
            zipcode: $zipcode
            telephone: $telephone
            country: $country
        ) {
            firstName
            lastName
            address
            zipcode
            telephone
            country
        }
    }
`;

type EditUserDetailsVars = {
    firstName?: string; 
    lastName?: string; 
    address?: string; 
    zipcode?: number; 
    telephone?: string; 
    country?: string; 
}

type Props = {
    firstName: string;
    lastName: string;
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

export const UserDetailsModal = (props: Props) => {
    const [firstName, setFirstName] = useState<string>(props.firstName);
    const [lastName, setLastName] = useState<string>(props.lastName);
    const [address, setAddress] = useState<string>(props.address);
    const [zipcode, setZipcode] = useState<number>(props.zipcode);
    const [country, setCountry] = useState<string>(props.country);
    const [telephone, setTelephone] = useState<string>(props.country);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState<boolean>(false);

    const [editUserDetails] = useMutation<{}, EditUserDetailsVars>(
        EDIT_USER_DETAILS_MUTATION, 
        { 
            variables: {
                firstName: firstName === props.firstName ? undefined : firstName,
                lastName: lastName === props.lastName ? undefined : lastName,
                address: address === props.address ? undefined : address,
                zipcode: zipcode === props.zipcode ? undefined : zipcode,
                country: country === props.country ? undefined : country,
                telephone: telephone === props.telephone ? undefined : telephone
            },
            onCompleted: () => {
                setModalConfirmLoading(false);
                setModalVisible(false);
                message.success("New address saved");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        editUserDetails();
        setModalConfirmLoading(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Link to="#" onClick={showModal} >Add new address</Link>
            <Modal
                title="Add new address"
                visible={modalVisible}
                onOk={handleOk}
                confirmLoading={modalConfirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cancel</Button>,
                    <Button type="primary" onClick={handleOk}>Save</Button>
                ]}
            >
                <Form
                    name="checkout"
                    scrollToFirstError
                    /* wrapperCol={{ sm: { span: 6, offset: 12 },
                                xs: { span: 6, offset: 12 }
                    }} */
                    initialValues={{
                        firstName: props.firstName,
                        lastName: props.lastName,
                        address: props.address,
                        zipcode: props.zipcode,
                        country: [props.country],
                        phone: props.telephone
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
                        <Input placeholder="First name" type="text" onChange={e => setFirstName(e.target.value)} />
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
                        <Input placeholder="Last name" type="text" onChange={e => setLastName(e.target.value)} />
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
                        <Input placeholder="Address" type="text" onChange={e => setAddress(e.target.value)} />
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
                        <Input placeholder="Zipcode" type="number" step={10} onChange={e => setZipcode(parseInt(e.target.value))} />
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
                        <Cascader options={allCountries} onChange={(value) => setCountry(value[0].toString())} />
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
                        <Input placeholder="Phone Number" type="tel" onChange={e => setTelephone(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}