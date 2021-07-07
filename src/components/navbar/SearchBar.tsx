import React, { Component } from 'react';
import { Input } from 'antd';

export default class SearchBar extends Component {
    render() {

        const {Search} = Input;

        return (
            <Search placeholder="Search for Records" allowClear style={{ width: 200, paddingTop: 17 }} />
        )
    }
}