import { useEffect, useState, useContext } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';

import { Content, Header, P, H1, Layout } from '../Styles';
import { OrderModel } from "../../components/interface/OrderModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import ErrorPage from "../warning/ErrorPage";
import Loading from "../warning/Loading";
import OrderList from "./order/OrderList";
import AddressForm from "../partials/AddressForm";
import { LoginCtx } from "../../context/LoginContext";

const MyAccount = () => {

    const [orders, setOrders] = useState<OrderModel[]>([] as OrderModel[]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [statusCode, setStatusCode] = useState<StatusCodeModel>({code: "500"});

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState<boolean>(false);

    const {state} = useContext(LoginCtx);

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + '/data/order.json')
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.data);
                    console.log(res.data);

                    const accountOrders = orders.filter(order => order.user.email === state.email);

                    if (accountOrders.length) {
                        setError(false);
                        setOrders(accountOrders);
                        setLoading(false);
                    }
                    else {
                        setStatusCode({code: '403'});
                        setLoading(false);
                        setError(true);
                    }
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 403:
                        setStatusCode({code: '403'});
                        break;
                    case 404:
                        setStatusCode({code: '404'});
                        break;
                    case 500:
                        setStatusCode({code: '500'});
                        break;
                    default:
                        break;
                }
                setError(true);
                setLoading(false);
            });
    }, [state.email, orders]);

    const showModal = () => {
        setModalVisible(true);
      };
    
    const handleOk = () => {
        setModalConfirmLoading(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    if (error) {
        return (
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> :
            <Layout>
                <Header textalign="center">
                    <H1 bold={true}>My Account</H1>
                </Header>
                <Content padding="3%">
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Card title="Order History">
                                <OrderList orders={orders} />
                            </Card>
                        </Col>
                        <Col span={12} push={6}>
                            <H1 bold={true} fontsize={18}>{orders[0].user.name}</H1>
                            <P fontsize={16}>{orders[0].user.email}</P>
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
                                    firstName={orders[0].user.name.split(" ")[0]} 
                                    lastName={orders[0].user.name.split(" ")[1]} 
                                    address={orders[0].user.address}
                                    zipcode={orders[0].user.zipcode}
                                    country={orders[0].user.country}
                                    phoneNumber={orders[0].user.phoneNumber}
                                    isAgreement={false}
                                    isButton={false}
                                />
                            </Modal>
                        </Col>
                    </Row>
                </Content>
            </Layout>
    )
}

export default MyAccount;