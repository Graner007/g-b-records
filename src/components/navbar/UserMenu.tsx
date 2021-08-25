import { Component } from 'react';
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { gql } from '@apollo/client';
import { ChildProps, graphql } from "@apollo/react-hoc";

import { UserModel } from '../interface/UserModel';
import { Content, Layout } from '../Styles';
import Loading from '../warning/Loading';
import Logout from "../auth/Logout";

const USER_QUERY = gql`
    query UserQuery {
        user {   
            id
        }
    }
`;

type UserType = {
    user: UserModel;
}

const withUser = graphql<{}, UserType>(USER_QUERY, {
    options: {
        pollInterval: 500,
        onError: () => {}
    }
});

class UserMenu extends Component<ChildProps<{}, UserType>, {}> {
    render() {
        const { loading, user, refetch } = this.props.data!;

        return (
            <>
                {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
                {user ?
                    <Menu>
                        <Menu.Item key="1"><Link to="/my-account">My Account</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/wishlist">Wish List</Link></Menu.Item>
                        <Menu.Item key="3" onClick={() => refetch()} ><Logout /></Menu.Item>
                    </Menu> :
                    <Menu>
                        <Menu.Item key="1"><Button block type="primary"><Link to="/login">Login</Link></Button></Menu.Item>
                        <Menu.Item key="2"><Button block><Link to="/registration">Create Account</Link></Button></Menu.Item>
                    </Menu>
                }
            </>
        )

    }
}

export default withUser(UserMenu);