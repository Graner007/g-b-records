import React, { Component } from 'react';
import { Select } from 'antd';

type Props = {
    items: string[];
}

export default class SelectOption extends Component<Props> {
    render() {

        const {Option} = Select;

        return (
            <Select defaultValue={this.props.items[0]} style={{ width: 'auto' }} bordered={false} size={"large"}>
                {this.props.items.map((item, index) => (
                    <Option value={item} key={index}>{item}</Option>
                ))}
            </Select>
        )
    }
}
