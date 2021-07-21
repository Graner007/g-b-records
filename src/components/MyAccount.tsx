import { useEffect, useState, useContext } from "react";
import { Layout, Row, Col, List, Card, Modal, Button } from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';

import { Content, Header, P, H1 } from './Styles';
import { OrderModel } from "../components/interface/OrderModel";
import { StatusCodeModel } from "./interface/StatusCodeModel";
import ErrorPage from "./warning/ErrorPage";
import Loading from "./warning/Loading";
import AddressForm from "./AddressForm";
import { LoginCtx } from "../context/LoginContext";

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
    }, [orders.length, state.email]);

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
                <Header textAlign="center">
                    <h1 style={{fontSize: 25}}>My Account</h1>
                </Header>
                <Content padding="2% 15% 3% 15%">
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Card title="Order History">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={orders}
                                    size="large"
                                    renderItem={item => (
                                    <List.Item
                                        actions={[<p style={{fontSize: 18}}>Payment: {item.payment}$</p>, <p>{item.productNumbers} {item.productNumbers > 1 ? "Records" : "Record"}</p>]}
                                    >
                                        <List.Item.Meta
                                            title={"Date: " + item.orderDate}
                                            description={<i>Address: {item.address}</i>}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={12} push={6}>
                            <H1 bold={true} fontSize={18}>{orders[0].user.name}</H1>
                            <P fontSize={16}>{orders[0].user.email}</P>
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