import React, { Component } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined as loadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

type Props = {
    size: number;
}

export default class Loading extends Component<Props> {
    render() {

        const LoadingOutlined = styled(loadingOutlined)`
           font-size: ${this.props.size}px;
        `;

        return (
            <Spin indicator={<LoadingOutlined spin />} />
        )
    }
}