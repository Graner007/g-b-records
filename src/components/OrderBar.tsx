import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SelectOption from './SelectOption';

type Props = {
    recordsLength: number;
}

export default class OrderBar extends Component<Props> {
    render() {
        return (
            <Row gutter={[24, 24]}>
                <Col xs={{ span: 12, offset: 3 }}
                    sm={{span: 12, offset: 1}} 
                    lg={{ span: 12, offset: 0 }}>
                        <b>{this.props.recordsLength} results found</b>
                </Col>
                <Col flex='auto' 
                    xs={{ span: 12, offset: 3 }} 
                    sm={{span: 12, offset: 5}} 
                    lg={{ span: 12, offset: 8 }}>
                        Sort By <SelectOption items={["Title A-Z", "Title Z-A", "Price High-Low", "Price Low-High", "Newest to Oldest", "Oldest to Newest"]} />
                </Col>
            </Row>
        )
    }
}