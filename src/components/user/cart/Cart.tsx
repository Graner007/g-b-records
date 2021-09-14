import { Component } from 'react';
import  { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';

import { Content, Header, Layout } from '../../Styles';
import Loading from "../../warning/Loading";
import ListCart from "./ListCart";
import { CartModel } from '../../interface/CartModel';
import ErrorMessage from '../../warning/ErrorMessage';

export const CART_QUERY = gql`
    query CartQuery {
        cart {   
            products {
                id
                name
                albumCover
                oneUnitPrice
                price
                leftInStock
                quantity
            }
            grandTotal
        }
    }
`;

export type CartType = {
    cart: CartModel;
}

const withCart = graphql<{}, CartType>(CART_QUERY);

class Cart extends Component<ChildProps<{}, CartType>, {}> {
    render() {
        const { loading, cart, error } = this.props.data!;
        
        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {cart &&
                    <Layout>
                        <Header>
                            <Row>
                                <Col span={12}><h1 style={{fontSize: 30}}>Your Cart</h1></Col>
                                <Col span={12}><Button size="large" type="primary" style={{float: "right", marginTop: 15}}><Link to="/checkout">Checkout</Link></Button></Col>
                            </Row>
                        </Header>
                        <Content padding="3%">
                            <ListCart cart={cart} editable={true} />
                        </Content>
                    </Layout>  
                }
            </>
        )
    }
}

export default withCart(Cart);