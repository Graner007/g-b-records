import { Component } from 'react';
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

import Logout from "../auth/Logout";

class UserMenu extends Component {
    render() {
        const cookies = new Cookies();

        return (
            cookies.get('token') ?
                <Menu>
                    <Menu.Item key="1"><Link to="/my-account">My Account</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/wishlist">Wish List</Link></Menu.Item>
                    <Menu.Item key="3"><Logout /></Menu.Item>
                </Menu> :
                <Menu>
                    <Menu.Item key="1"><Button block type="primary"><Link to="/login">Login</Link></Button></Menu.Item>
                    <Menu.Item key="2"><Button block><Link to="/registration">Create Account</Link></Button></Menu.Item>
                </Menu>
        )

    }
}

export default UserMenu;