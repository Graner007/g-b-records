import { Menu } from 'antd';
import { Component } from 'react';
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export default class Navbar extends Component {
    render() {       
        return (
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2"><Dropdown title="Shop By Artist" itemName="artist" /></Menu.Item>
                <Menu.Item key="3"><Dropdown title="Shop By Category" itemName="genre" /></Menu.Item>
                <Menu.Item key="4"><SearchBar /></Menu.Item>
                <Menu.Item key="5" style={{marginLeft: "auto"}}><ShoppingCartOutlined /></Menu.Item>
                <Menu.Item key="6"><UserOutlined /></Menu.Item>
            </Menu>
        )
    }
}