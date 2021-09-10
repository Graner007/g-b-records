import { Component } from 'react';
import { Layout, PageHeader, Card, Row, Col, List, Avatar } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';
 
import { OrderModel } from "../../interface/OrderModel";
import { Content, Header, P } from "../../Styles";
import Loading from "../../warning/Loading";
import ErrorMessage from '../../warning/ErrorMessage';

const ORDER_QUERY = gql`
    query Order($orderId: Int!) {
        order(orderId: $orderId) {  
            id
            orderDate
            address
            productNumber
            payment
            products {
                id
                name
                albumCover
                price
                quantity
            }
        }
    }
`;

type OrderType = {
    order: OrderModel;
}

type OrderVars = {
    orderId: number;
} 

type RouterParam = {
    id: string;
}

interface Props extends RouteComponentProps<RouterParam> {

}

class OrderDetails extends Component<ChildProps<Props, OrderType, OrderVars>, {}> {
    render() {
        const { loading, order, error } = this.props.data!;

        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {order && 
                    <Layout>
                        <Header>
                            <PageHeader onBack={() => this.props.history.goBack()} title={"My Account > Order " + order.id + " - " + order.orderDate.split("T")[0]} />
                        </Header>
                        <Content padding="3%">
                            <Row gutter={24} justify="center">
                                <Col span={12}>
                                    <Card
                                        title={order.address}
                                        extra={<P fontsize={18}>{order.payment}$</P>}
                                        >
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={order.products}
                                            size="large"
                                            renderItem={item => (
                                            <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><List.Item
                                                className="shadow"
                                                actions={[<P fontsize={18}>Price: {item.price}$</P>, <P fontsize={18}>Quantity: {item.quantity}</P>]}
                                            >
                                                <List.Item.Meta
                                                    title={item.name}
                                                    avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                                                />
                                            </List.Item></Link>
                                            )}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                }
            </>
        )

    }
}

export default withRouter(graphql<Props, OrderType, OrderVars>(ORDER_QUERY, { options: props => ({ variables: { orderId: parseInt(props.match.params.id) } }) })(OrderDetails));