import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useQuery, gql, ApolloError, useMutation } from '@apollo/client';
import { message } from 'antd';
import { Link } from "react-router-dom";

import { Layout, Header, Content, H1 } from "../Styles";
import ErrorMessage from "../warning/ErrorMessage";
import Loading from '../warning/Loading';
import { OrderModel } from '../interface/OrderModel';
import { CART_QUERY } from "../user/cart/Cart";
import OrderProductsList from "../user/order/OrderProductsList";

const CHECKOUT_SESSION_QUERY = gql`
  query CheckoutSession($checkoutSessionId: String!) {
    checkoutSession(checkoutSessionId: $checkoutSessionId) {
      id
      paymentSuccess
      customerEmail
    }
  }
`;

const SUCCESSFUL_PAYMENT_MUTATION = gql`
  mutation SuccessfulPayment {
    successfulPayment {
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

type CheckoutSessionType = {
    checkoutSession: {
        id: string;
        customerEmail: string;
        paymentSuccess: boolean;
    }
}

type CheckoutSessionVars = {
    checkoutSessionId: string;
}

type SuccessfulPaymentType = {
    successfulPayment: OrderModel;
}

const SuccessfulPayment = () => {
    const [order, setOrder] = useState<OrderModel>();
    const location = useLocation();
    const sessionId = location.search.replace('?session_id=', '');

    const [successfulPayment] = useMutation<SuccessfulPaymentType, SuccessfulPaymentType>(
        SUCCESSFUL_PAYMENT_MUTATION, 
        {
            onCompleted: (data: SuccessfulPaymentType) => {
                setOrder(data.successfulPayment);
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            refetchQueries: [{ query: CART_QUERY }]
        }
    );

    const { data, loading, error } = useQuery<CheckoutSessionType, CheckoutSessionVars>(
        CHECKOUT_SESSION_QUERY, 
        { 
            variables: { checkoutSessionId: sessionId },
            onCompleted: (data: CheckoutSessionType) => {
                if (data.checkoutSession.paymentSuccess) {
                    successfulPayment();
                }
            }
        }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && order &&
                <Layout>
                    <Header textalign="center">
                        <H1 bold={true}>Thank you for your order!</H1>
                    </Header>
                    <Content backgroundcolor="inherit" padding="20px 0 0 0">
                        <Link to="/" style={{textAlign: "center"}}><H1 bold={false} style={{color: "blue"}} fontsize={17}>Back to Home</H1></Link>
                        <H1 bold={false} fontsize={17} textalign="center"><b>Email:</b> {data.checkoutSession.customerEmail}</H1>
                        <H1 bold={false} fontsize={17} textalign="center"><b>Address:</b> {order.address}</H1>
                        <H1 bold={false} fontsize={17} textalign="center"><b>Date:</b> {order.orderDate.split("T")[0]}</H1><br />
                        <OrderProductsList order={order} />
                    </Content>
                </Layout>
            }
        </>
    )
}

export default SuccessfulPayment;