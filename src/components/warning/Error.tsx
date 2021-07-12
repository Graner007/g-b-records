import React, { Component } from 'react';
import { Result } from 'antd';
import { Link } from "react-router-dom";

type Props = {
    status: "500" | "403" | "404";
}

type State = {
    title: string;
    subTitle: string;
}

export default class Error extends Component<Props, State> {

    state: State = {
        title: "",
        subTitle: ""
    }

    componentDidMount() {
        console.log(this.props.status);
        switch (this.props.status) {
            case "500":
                this.setState({title: this.props.status, subTitle: "Sorry, something went wrong."});
                break;
            case "403":
                this.setState({title: this.props.status, subTitle: "Sorry, you are not authorized to access this page."});
                break;
            case "404":
                this.setState({title: this.props.status, subTitle: "Sorry, the page you visited does not exist."});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Result
                status={this.props.status}
                title={this.state.title}
                subTitle={this.state.subTitle}
                extra={<Link to="/">Back Home</Link>}
            />
        )
    }
}