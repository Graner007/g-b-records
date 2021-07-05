import { Menu, Input } from 'antd';
import { Component } from 'react';
import Logo from "./Logo";
import Dropdown from "./Dropdown";

export default class Navbar extends Component {
    render() {        
        return (
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="1">Home</Menu.Item>        
                <Menu.Item key="2"><Dropdown title="Shop By Artist" items={['Elvis Presley', 'Michael Jackson', 'Frank Sinatra']} /></Menu.Item>
                <Menu.Item key="2"><Dropdown title="Shop By Category" items={['Pop', 'Jazz', 'Metal']} /></Menu.Item>
            </Menu>
        )
    }
}