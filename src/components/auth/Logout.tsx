import { Component } from 'react';
import { Link } from "react-router-dom";
import { message } from "antd";
import Cookies from 'universal-cookie';

export default class Logout extends Component {
    render() {
        const logout = () => {
            const cookies = new Cookies();
            cookies.remove("token");
            message.success("Successful logout");
        }

        return (
            <Link to="/log-out" onClick={logout}>
                Logout
            </Link>
        )
    }
}