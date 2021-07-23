import { Component } from 'react';
import { Row, Col } from 'antd';
import SelectOption from '../partials/SelectOption';

type Props = {
    recordsLength: number;
}

export default class OrderBar extends Component<Props> {
    render() {
        return (
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <b>{this.props.recordsLength} results found</b>
                </Col>
                <Col span={12} push={8}>
                    Sort By<SelectOption items={["Title A-Z", "Title Z-A", "Price High-Low", "Price Low-High", "Newest to Oldest", "Oldest to Newest"]} />
                </Col>
            </Row>
        )
    }
}