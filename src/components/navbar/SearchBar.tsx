import { Component } from 'react';
import { Input } from 'antd';

type Props = {
    placeholder?: string;
    size: "large" | "middle" | "small";
    width?: string;
    padding?: string;
}

export default class SearchBar extends Component<Props> {
    render() {

        const {Search} = Input;

        return (
            <Search placeholder={this.props.placeholder} size={this.props.size} allowClear style={{ width: this.props.width, padding: this.props.padding }} />
        )
    }
}