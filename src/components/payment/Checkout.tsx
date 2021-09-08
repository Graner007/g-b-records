import { Component } from "react";
import { Row, Col } from 'antd';
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';

import { H1, Content, Header, Layout } from "../Styles";
import Loading from "../warning/Loading";
import PaymentStep from "./PaymentStep";
import ErrorMessage from '../warning/ErrorMessage';
import ListCart from '../user/cart/ListCart';
import OrderForm from "./OrderForm";
import { UserModel } from '../interface/UserModel';

const USER_QUERY = gql`
  query userQuery {
    user {
        firstName
        lastName
        email
        address
        zipcode
        telephone
        country
        cart {
            id
            grandTotal
            products {
                id
                name
                albumCover
                price
                quantity
            }
        }
    }
  }
`;

type UserType = {
    user: UserModel;
}

const withCheckoutDetails = graphql<{}, UserType>(USER_QUERY);

class Checkout extends Component<ChildProps<{}, UserType>, {}> {
    render() {
        const { loading, user, error } = this.props.data!;

        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {user && 
                     <Layout>
                        <Header>
                            <PaymentStep currentIndex={1} />
                        </Header>
                        <Content>
                            <Row justify="end" gutter={24}>
                                <Col span={12}>
                                    <Header backgroundcolor="inherit" textalign="center">
                                        <H1 bold={true}>Checkout</H1>
                                    </Header>
                                    <OrderForm
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        email={user.email}
                                        address={user.address}
                                        zipcode={user.zipcode}
                                        country={user.country}
                                        telephone={user.telephone}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Header backgroundcolor="inherit" textalign="center"><H1 bold={true}>Cart</H1></Header>
                                    <ListCart cart={user.cart} editable={false} />
                                </Col>
                            </Row> 
                        </Content>
                    </Layout>  
                }
            </>
        )
    }
}

export default withCheckoutDetails(Checkout);