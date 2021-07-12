import React, { Component } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

type Props = {
    size: number;
}

export default class Loading extends Component<Props> {
    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: this.props.size }} spin />;
        return (
            <Spin indicator={antIcon} />
        )
    }
}