import { Component } from 'react';
import { Layout } from "antd";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';
 
import { OrderModel } from "../../interface/OrderModel";
import { Content, Header, H1 } from "../../Styles";
import Loading from "../../warning/Loading";
import ErrorMessage from '../../warning/ErrorMessage';
import OrderList from './OrderList';

const ORDERS_QUERY = gql`
    query Orders {
        orders {  
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

type OrdersType = {
    orders: OrderModel[];
}

class Orders extends Component<ChildProps<{}, OrdersType, {}>, {}> {
    render() {
        const { loading, orders, error } = this.props.data!;

        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {orders && 
                    <Layout>
                        <Header textalign="center">
                            <H1 bold={true}>Orders</H1>
                        </Header>
                        <Content padding="3% 10% 10% 10%">
                            <OrderList orders={orders} />
                        </Content>
                    </Layout>
                }
            </>
        )
    }
}

export default graphql<{}, OrdersType, {}>(ORDERS_QUERY)(Orders);