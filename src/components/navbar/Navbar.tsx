import { Menu, Dropdown as Drop, Button } from 'antd';
import { Component } from 'react';
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {      
        
        const userMenu = (
            <Menu>
                <Menu.Item key="1"><Button block type="primary"><Link to="/login">Login</Link></Button></Menu.Item>
                <Menu.Item key="2"><Button block><Link to="/registration">Create Account</Link></Button></Menu.Item>
                <Menu.Item key="3"><Link to="/wishlist">Wish List</Link></Menu.Item>
            </Menu>
        );

        return (
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Dropdown title="Shop By Artist" itemName="artist" /></Menu.Item>
                <Menu.Item key="3"><Dropdown title="Shop By Category" itemName="genre" /></Menu.Item>
                <Menu.Item key="4"><SearchBar placeholder="Search for Records" size="large" width="300px" padding="12px 0 0 0" /></Menu.Item>
                <Menu.Item key="5" style={{marginLeft: "auto"}}><ShoppingCartOutlined style={{fontSize: 20}} /></Menu.Item>
                <Menu.Item key="6">
                    <Drop overlay={userMenu}>
                        <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <UserOutlined style={{fontSize: 20}} />
                        </div>
                    </Drop>
                </Menu.Item>
            </Menu>
        )
    }
}