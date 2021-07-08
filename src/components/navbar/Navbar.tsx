import { Menu } from 'antd';
import { Component } from 'react';
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {       
        return (
            <Menu theme="light" mode="horizontal">
                <Link to="/"><Menu.Item key="1">Home</Menu.Item></Link>
                <Menu.Item key="2"><Dropdown title="Shop By Artist" itemName="artist" /></Menu.Item>
                <Menu.Item key="3"><Dropdown title="Shop By Category" itemName="genre" /></Menu.Item>
                <Menu.Item key="4"><SearchBar placeholder="Search for Records" size="large" width="300px" padding="12px 0 0 0" /></Menu.Item>
                <Menu.Item key="5" style={{marginLeft: "auto"}}><ShoppingCartOutlined style={{fontSize: 20}} /></Menu.Item>
                <Menu.Item key="6"><UserOutlined style={{fontSize: 20}} /></Menu.Item>
            </Menu>
        )
    }
}