import { Component } from 'react';
import { Layout, PageHeader, Row, Col } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';
 
import { OrderModel } from "../../interface/OrderModel";
import { Content, Header } from "../../Styles";
import Loading from "../../warning/Loading";
import ErrorMessage from '../../warning/ErrorMessage';
import OrderProductsList from "./OrderProductsList";

export const ORDER_QUERY = gql`
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

interface Props extends RouteComponentProps<RouterParam> {}

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
                                    <OrderProductsList order={order} />
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