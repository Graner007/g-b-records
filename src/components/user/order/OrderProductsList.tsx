import { Card, List, Avatar } from "antd";
import { Link } from "react-router-dom";

import { OrderModel } from "../../interface/OrderModel";
import { P } from "../../Styles";

type Props = {
    order: OrderModel;
}

const OrderProductsList = (props: Props) => {
    return (
        <Card
            title={props.order.address}
            extra={<P fontsize={18}>{props.order.payment}$</P>}
            >
            <List
                itemLayout="horizontal"
                dataSource={props.order.products}
                size="large"
                renderItem={item => (
                <Link to={"/products/" + item.name.toLowerCase().replace(" ", "-")}><List.Item
                    className="shadow"
                    actions={[<P fontsize={18}>Price: {item.price}$</P>, <P fontsize={18}>Quantity: {item.quantity}</P>]}
                >
                    <List.Item.Meta
                        title={item.name}
                        avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                    />
                </List.Item></Link>
                )}
            />
        </Card>
    )
}

export default OrderProductsList;