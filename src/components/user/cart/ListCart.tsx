import { Component } from 'react';
import { List, InputNumber, Avatar } from "antd";
import { DeleteFilled } from '@ant-design/icons';

import { CartItemModel } from "../../../components/interface/CartItemModel";
import EmptyDescription from "../../warning/EmptyDescription";
import { P } from "../../Styles";

type Props = {
    cart: CartItemModel[];
    editable: boolean;
}

export default class ListCart extends Component<Props> {

    grandTotal():number {
        let total: number = 0;
        this.props.cart.map(item => total += item.price * item.quantity);
        return total;
    }

    render() {
        return (
            this.props.cart.length === 0 ? <EmptyDescription text="Your cart is empty" /> : 
            <List
                itemLayout="horizontal"
                dataSource={this.props.cart}
                size="large"
                renderItem={item => (
                <List.Item className="shadow"
                    actions={[<P fontSize={22} key="price">{item.price * item.quantity}$</P>, (this.props.editable ? <DeleteFilled style={{fontSize: 22}} /> : null )]}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={item.artist}
                        avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                    />
                    { this.props.editable ? <InputNumber min={0} defaultValue={item.quantity} size="large" /> : <P fontSize={20}>{item.quantity}X</P> }
                </List.Item>
                )}
                footer={<P fontSize={22} style={{textAlign: "right"}}>Grand Total: {this.grandTotal()}$</P>}
            />
        )
    }
}