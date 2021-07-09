import React, { Component } from 'react';
import { Alert } from "antd";

export default class ErrorPage extends Component {
    render() {
        return (
            <Alert
                message="Wrong place"
                description="Something went wrong, maybe just a tpyo..."
                type="error"
            />
        )
    }
}