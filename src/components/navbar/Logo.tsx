import { Component } from 'react';
import logo from "../../vinyl.svg";
import { Image } from "antd";

export default class Logo extends Component {
    render() {
        return (
            <Image src={logo} alt="logo" width={100} height={100} className="logo" />
        )
    }
}