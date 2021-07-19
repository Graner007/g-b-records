import { useEffect, useState, useContext } from "react";
import { Layout, Row, Col, List, Card } from "antd";
import axios from "axios";

import { Content, Header } from './Styles';
import { OrderModel } from "../components/interface/OrderModel";
import { StatusCodeModel } from "./interface/StatusCodeModel";
import ErrorPage from "./warning/ErrorPage";
import Loading from "./warning/Loading";
import { LoginCtx } from "../context/LoginContext";

const MyAccount = () => {

    const [orders, setOrders] = useState<OrderModel[]>([] as OrderModel[]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [statusCode, setStatusCode] = useState<StatusCodeModel>({code: "500"});
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
                        setLoading(false);
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
                <Content padding={50}>
                    <Row>
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
                    </Row>
                </Content>
            </Layout>
    )
}

export default MyAccount;