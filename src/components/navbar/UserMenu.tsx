import React, { Component } from 'react';
import { Menu, Button, message } from "antd";
import { Link } from "react-router-dom";

type State = {
    loggedIn: boolean;
}

export default class UserMenu extends Component {

    state: State = {
        loggedIn: false,
    }

    componentDidMount() {
        if (localStorage.getItem('email')) { this.setState({loggedIn: true}); }
    }

    render() {

        const logout = () => {
            localStorage.removeItem("email");
            this.setState({loggedIn: false});
            message.success("Successful logout");
        }

        return (
            this.state.loggedIn ? 
            <Menu>
                <Menu.Item key="1"><Link to="/my-account">My Account</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/wishlist">Wish List</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/log-out" onClick={logout}>Log out</Link></Menu.Item>
            </Menu> :
            <Menu>
                <Menu.Item key="1"><Button block type="primary"><Link to="/login">Login</Link></Button></Menu.Item>
                <Menu.Item key="2"><Button block><Link to="/registration">Create Account</Link></Button></Menu.Item>
                <Menu.Item key="3"><Link to="/wishlist">Wish List</Link></Menu.Item>
            </Menu>
        )
    }
}