import { List, InputNumber, Avatar, message } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { ApolloError, gql, useMutation } from '@apollo/client';

import { CartModel } from "../../../components/interface/CartModel";
import EmptyDescription from "../../warning/EmptyDescription";
import { P } from "../../Styles";
import { CART_QUERY } from './Cart';

const UPDATE_CARTITEM_QUANTITY_MUTATION = gql`
    mutation UpdateCartItemQuantity($cartItemId: Int!, $cartItemQuantity: Int!) {
        updateCartItemQuantity(cartItemId: $cartItemId, cartItemQuantity: $cartItemQuantity) {
            id
            name
            albumCover
            oneUnitPrice
            price
            quantity
        }
    }
`;

const DELETE_CARTITEM_MUTATION = gql`
    mutation DeleteCartItem($cartItemId: Int!) {
        deleteCartItem(cartItemId: $cartItemId) {
            id
            name
        }
    }
`;

type UpdateCartItemQuantityVars = {
    cartItemId: number;
    cartItemQuantity: number;
}

type DeleteCartItemVars = {
    cartItemId: number;
}

type Props = {
    cart: CartModel;
    grandTotal: number;
    editable: boolean;
}

const ListCart = (props: Props) => {
    const [updateCartItemQuantity] = useMutation<{}, UpdateCartItemQuantityVars>(
        UPDATE_CARTITEM_QUANTITY_MUTATION, 
        { 
            onCompleted: () => {
                message.success("Record quantity updated")
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            refetchQueries: [{query: CART_QUERY}]
        }
    );

    const [deleteCartItem] = useMutation<{}, DeleteCartItemVars>(
        DELETE_CARTITEM_MUTATION, 
        { 
            onCompleted: () => {
                message.success("Record removed from cart")
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            refetchQueries: [{query: CART_QUERY}]
        }
    );

    return (
        props.cart.products.length === 0 ? <EmptyDescription text="Your cart is empty" /> : 
        <List
            itemLayout="horizontal"
            dataSource={props.cart.products}
            size="large"
            renderItem={item => (
            <List.Item className="shadow"
                actions={[
                    <P 
                        fontsize={22} 
                        key="price"
                    >
                        {item.price}$
                    </P>,
                    (props.editable ? 
                        <DeleteFilled
                            onClick={() => deleteCartItem({ variables: { cartItemId: parseInt(String(item.id)) } })}
                            style={{fontSize: 22, cursor: "pointer"}} /> : null )]}
                        >
                <List.Item.Meta
                    title={<Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}>{item.name}</Link>}
                    description={item.artist}
                    avatar={<Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Avatar src={item.albumCover} shape="square" size="large" /></Link>}
                />
                { props.editable ? 
                    <InputNumber 
                    onChange={e => e !== null && updateCartItemQuantity({ variables: { cartItemId: parseInt(String(item.id)), cartItemQuantity: e.valueOf()  } })} 
                    min={0} 
                    defaultValue={item.quantity} 
                    size="large" /> : 
                    <P fontsize={20}>{item.quantity}X</P> 
                }
            </List.Item>
            )}
            footer={<P fontsize={22} textalign="right">Grand Total: {props.grandTotal}$</P>}
        />
    )
}

export default ListCart;