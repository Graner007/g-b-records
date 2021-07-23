import { Component } from 'react';
import { Table } from "antd";

import CreditCardForm from '../partials/CreditCardForm';

export default class PaymentTable extends Component {
    render() {

        const columns = [
            {
                title: "Credit card",
                dataIndex: "credit card",
                key: "credit card"
            }
        ]

        const data = [
            {
                "credit card": <CreditCardForm />
            }
        ]

        return (
            <Table pagination={false} bordered={true} tableLayout="fixed" columns={columns} dataSource={data} />
        )
    }
}