import { Component } from 'react';
import { Menu, Dropdown as Drop } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

export default class Navbar extends Component {
    render() {
        return (
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Dropdown title="Shop By Artist" type="artist" /></Menu.Item>
                <Menu.Item key="3"><Dropdown title="Shop By Category" type="genre" /></Menu.Item>
                <Menu.Item key="4" disabled={true} style={{cursor: "auto"}}><SearchBar placeholder="Search for Records" size="large" width="300px" padding="12px 0 0 0" /></Menu.Item>
                <Menu.Item key="5" style={{marginLeft: "auto"}}><Link to="/cart"><ShoppingCartOutlined style={{fontSize: 20}} /></Link></Menu.Item>
                <Menu.Item key="6">
                    <Drop overlay={<UserMenu />}>
                        <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <UserOutlined style={{fontSize: 20}} />
                        </div>
                    </Drop>
                </Menu.Item>
            </Menu>
        )
    }
}