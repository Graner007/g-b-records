import { Component } from 'react';
import { Table } from "antd";

import { UserModel } from "../interface/UserModel";

type Props = {
    user: UserModel;
}

export default class InformationTable extends Component<Props> {
    render() {

        const shipmentColumns = [
            {
                title: "Email",
                dataIndex: "email",
                key: "email"
            },
            {
                title: "Address",
                dataIndex: "address",
                key: "address"
            }
        ]

        return (
            <Table pagination={false} bordered={true} tableLayout="fixed" showHeader={false} columns={shipmentColumns} dataSource={[{email: this.props.user.email, address: this.props.user.address}]} />
        )
    }
}