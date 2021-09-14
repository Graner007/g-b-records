import { Component } from 'react';
import { Steps } from "antd";
import {Link} from "react-router-dom";

type Props = {
    currentIndex: number;
}

export default class PaymentStep extends Component<Props> {
    render() {

        const { Step } = Steps;

        return (
            <Steps size="small" current={this.props.currentIndex}>
                <Step title={<Link to="/cart">Cart</Link>} />
                <Step title={<Link to="/checkout">Checkout</Link>} />
                <Step title={<Link to="*">Payment</Link>} />
            </Steps>
        )
    }
}