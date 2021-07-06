import { Input, Menu } from 'antd';
import { Component } from 'react';
import Logo from "./Logo";
import Dropdown from "./Dropdown";
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export default class Navbar extends Component {
    render() {  
        const {Search} = Input;      
        return (
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2"><Dropdown title="Shop By Artist" items={['Elvis Presley', 'Michael Jackson', 'Frank Sinatra']} /></Menu.Item>
                <Menu.Item key="3"><Dropdown title="Shop By Category" items={['Pop', 'Jazz', 'Metal']} /></Menu.Item>
                <Menu.Item key="4"><Search placeholder="input search text" allowClear style={{ width: 200, paddingTop: 17 }} /></Menu.Item>
                <Menu.Item key="5" style={{marginLeft: "auto"}}><ShoppingCartOutlined /></Menu.Item>
                <Menu.Item key="6"><UserOutlined /></Menu.Item>
            </Menu>
        )
    }
}