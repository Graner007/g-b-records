import { Component } from 'react';
import { List, InputNumber, Avatar } from "antd";
import { DeleteFilled } from '@ant-design/icons';

import { CartItemModel } from "../components/interface/CartItemModel";

type Props = {
    cart: CartItemModel[];
    editable: boolean;
}

export default class ListCart extends Component<Props> {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.cart}
                size="large"
                renderItem={item => (
                <List.Item
                    actions={[<p style={{fontSize: 22}} key="price">{item.price * item.quantity}$</p>, (this.props.editable ? <DeleteFilled style={{fontSize: 22}} /> : null )]}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={item.artist}
                        avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                    />
                    { this.props.editable ? <InputNumber min={0} defaultValue={item.quantity} size="large" /> : null }
                </List.Item>
                )}
            />
        )
    }
}
