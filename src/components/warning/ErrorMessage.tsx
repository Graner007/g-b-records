import { Component } from 'react';
import { Alert } from 'antd';

type Props = {
    text: string;
}

export default class ErrorMessage extends Component<Props> {
    render() {
        return (
            <Alert
                message="Error"
                description={this.props.text}
                type="error"
                showIcon
            />
        )
    }
}