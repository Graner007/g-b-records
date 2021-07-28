import { Component } from 'react';
import { List } from "antd";
import { Link } from "react-router-dom";

import { P } from "../../Styles";
import { OrderModel } from "../../interface/OrderModel";

type Props = {
    orders: OrderModel[];
}

export default class OrderList extends Component<Props> {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.orders}
                size="large"
                renderItem={item => (
                <Link to={"/orders/" + item.id}><List.Item
                    actions={[<P fontSize={18}>Payment: {item.payment}$</P>, <P fontSize={18}>{item.productNumbers} {item.productNumbers > 1 ? "Records" : "Record"}</P>]}
                >
                    <List.Item.Meta
                        title={"Date: " + item.orderDate}
                        description={<i>Address: {item.address}</i>}
                    />
                </List.Item></Link>
                )}
            />
        )
    }
}