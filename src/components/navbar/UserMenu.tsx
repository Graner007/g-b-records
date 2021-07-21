import React, { Component } from 'react';
import { Menu, Button, message } from "antd";
import { Link } from "react-router-dom";

import { LoginCtx } from "../../context/LoginContext";

export default class UserMenu extends Component {

    static contextType = LoginCtx;

    render() {

        const logout = () => {
            this.context.update({loggedIn: false, email: ""});
            message.success("Successful logout!");
        }

        return (
            this.context.state.loggedIn ? 
            <Menu>
                <Menu.Item key="1"><Link to="/my-account">My Account</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/wishlist">Wish List</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/log-out" onClick={logout}>Log out</Link></Menu.Item>
            </Menu> :
            <Menu>
                <Menu.Item key="1"><Button block type="primary"><Link to="/login">Login</Link></Button></Menu.Item>
                <Menu.Item key="2"><Button block><Link to="/registration">Create Account</Link></Button></Menu.Item>
            </Menu>
        )
    }
}