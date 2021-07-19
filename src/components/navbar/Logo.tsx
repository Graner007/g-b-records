import { Component } from 'react';
import { Image } from "antd";

import logo from "../../vinyl.svg";

export default class Logo extends Component {
    render() {
        return (
            <Image src={logo} alt="logo" width={100} height={100} className="logo" />
        )
    }
}