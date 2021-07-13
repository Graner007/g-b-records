import React, { useEffect } from "react";
import { Layout, Row, Col, List, Card } from "antd";
import { Content, Header } from 'antd/lib/layout/layout';
import { OrderModel } from "../components/interface/OrderModel";
import { StatusCodeModel } from "./interface/StatusCodeModel";
import axios from "axios";
import Error from "./warning/Error";
import Loading from "./warning/Loading";

const MyAccount = () => {

    const [orders, setOrders] = React.useState<OrderModel[]>([] as OrderModel[]);
    const [error, setError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "500"});

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + '/data/order.json')
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.data);

                    const accountOrders = orders.filter(order => order.user.email === localStorage.getItem("email"));

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
    }, [orders.length]);


    if (error) {
        return (
            <Error status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> :
            <Layout>
                <Header className="header" style={{backgroundColor: 'white', textAlign: "center"}}>
                    <h1 style={{fontSize: 25}}>My Account</h1>
                </Header>
                <Content style={{padding: 50}} >
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