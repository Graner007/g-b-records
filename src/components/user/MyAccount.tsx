import { useState } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { Content, Header, P, H1, Layout } from '../Styles';
import Loading from "../warning/Loading";
import OrderList from "./order/OrderList";
import AddressForm from "../partials/AddressForm";
import ErrorMessage from "../warning/ErrorMessage";
import { UserModel } from "../interface/UserModel";

const USER_DETAILS_QUERY = gql`
  query userQuery {
    user {
        id
        firstName
        lastName
        email
        address
        zipcode
        telephone
        country
        orders {
            orderDate
            address
            productNumber
            payment
            products {
                id
                name
                albumCover
                price
            }
        }
    }
  }
`;

type UserDetailsType = {
    user: UserModel;
}

const MyAccount = () => {
    const { data, loading, error } = useQuery<UserDetailsType, {}>(USER_DETAILS_QUERY);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState<boolean>(false);

    const showModal = () => {
        setModalVisible(true);
      };
    
    const handleOk = () => {
        setModalConfirmLoading(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                    <Header textalign="center">
                        <H1 bold={true}>My Account</H1>
                    </Header>
                    <Content padding="3%">
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <Card title="Order History">
                                    <OrderList orders={data.user.orders} />
                                </Card>
                            </Col>
                            <Col span={12} push={6}>
                                <H1 bold={true} fontsize={18}>{data.user.firstName + " " + data.user.lastName}</H1>
                                <P fontsize={16}>{data.user.email}</P>
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
                                <AddressForm 
                                        firstName={data.user.firstName} 
                                        lastName={data.user.lastName} 
                                        address={data.user.address}
                                        zipcode={data.user.zipcode}
                                        country={data.user.country}
                                        phoneNumber={data.user.telephone}
                                        isAgreement={false}
                                        isButton={false}
                                    />
                                </Modal>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            }
        </>
    )
}

export default MyAccount;