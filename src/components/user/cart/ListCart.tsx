import { Component } from 'react';
import { List, InputNumber, Avatar, message } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { ApolloError, gql } from '@apollo/client';

import { CartModel } from "../../../components/interface/CartModel";
import EmptyDescription from "../../warning/EmptyDescription";
import { P } from "../../Styles";
import { CartItemModel } from '../../interface/CartItemModel';
import { CART_QUERY, CartType } from './Cart';

const UPDATE_CARTITEM_QUANTITY_MUTATION = gql`
    mutation UpdateCartItemQuantity($cartItemId: Int!, $cartItemQuantity: Int!) {
        updateCartItemQuantity(cartItemId: $cartItemId, cartItemQuantity: $cartItemQuantity) {
            name   
            quantity
            price
        }
    }
`;

type UpdateCartItemQuantityVars = {
    cartItemId: number;
    cartItemQuantity: number;
}

type CartItemType = {
    updateCartItemQuantity: CartItemModel;
}

type Props = {
    cart: CartModel;
    grandTotal: number;
    editable: boolean;
}

class ListCart extends Component<ChildProps<Props, CartItemType, UpdateCartItemQuantityVars>, {}> {
    render() {
        return (
            this.props.cart.products.length === 0 ? <EmptyDescription text="Your cart is empty" /> : 
            <List
                itemLayout="horizontal"
                dataSource={this.props.cart.products}
                size="large"
                renderItem={item => (
                <List.Item className="shadow"
                    actions={[<P fontsize={22} key="price">{item.price * item.quantity}$</P>, (this.props.editable ? <DeleteFilled style={{fontSize: 22, cursor: "pointer"}} /> : null )]}
                >
                    <List.Item.Meta
                        title={<Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}>{item.name}</Link>}
                        description={item.artist}
                        avatar={<Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Avatar src={item.albumCover} shape="square" size="large" /></Link>}
                    />
                    { this.props.editable ? 
                        <InputNumber 
                        onChange={e => {
                            this.props.mutate && 
                            this.props.mutate({ 
                                variables: { 
                                    cartItemId: parseInt(String(item.id)), 
                                    cartItemQuantity: e.valueOf() 
                                },
                                update: (proxy, { data }) => {
                                    const cart = proxy.readQuery<CartType>({ query: CART_QUERY });

                                    if (data && cart) {
                                        if (data.updateCartItemQuantity.quantity === 0) {
                                            cart.cart.cart.products.filter(product => product.id === data.updateCartItemQuantity.id);
                                        }
                                        else {
                                            cart.cart.cart.products.forEach(product => {
                                                if (product.id === data.updateCartItemQuantity.id) {
                                                    product.price = data.updateCartItemQuantity.price * data.updateCartItemQuantity.quantity;
                                                }
                                            });
                                        }
                                        proxy.writeQuery({ query: CART_QUERY, data: cart });
                                    }
                                }
                            })
                                .then(() => message.success("Record quantity updated"))
                                .catch((err: ApolloError) => message.error(err.message));
                        }} 
                        min={0} 
                        defaultValue={item.quantity} 
                        size="large" /> : 
                        <P fontsize={20}>{item.quantity}X</P> 
                    }
                </List.Item>
                )}
                footer={<P fontsize={22} textalign="right">Grand Total: {this.props.grandTotal}$</P>}
            />
        )
    }
}

export default graphql<Props, CartItemType, UpdateCartItemQuantityVars>(UPDATE_CARTITEM_QUANTITY_MUTATION)(ListCart);