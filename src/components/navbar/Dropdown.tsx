import { Component } from 'react';
import { Dropdown as Drop, List } from 'antd';
import { Link } from "react-router-dom";
import { ApolloError, gql } from '@apollo/client';
import { ChildProps, graphql } from "@apollo/react-hoc";

import ErrorMessage from '../warning/ErrorMessage';

const DROPDOWN_QUERY = gql`
    query DropdownQuery(
        $type: Type!
    ) {
        dropdown(type: $type) {
            id
            name
        }
    }
`;

type DropdownModel = {
    id: number;
    name: string;
}

type DropdownType = {
    dropdown: DropdownModel[];
}

type Props = {
    title: string;
    type: "artist" | "genre";
}

const withDropdownItems = graphql<Props, DropdownType>(DROPDOWN_QUERY, {
    options: ({ type }) => ({
      variables: { 
        type
      },
      fetchPolicy: "no-cache",
      pollInterval: 5000,
      onError: (error: ApolloError) => {
          return <ErrorMessage text={error.message} />
      }
    })
});

class Dropdown extends Component<ChildProps<Props, DropdownType>, {}> {
    render() {
        const { loading, dropdown } = this.props.data!;

        const menuList = (
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={dropdown}
                loading={loading}
                renderItem={(item, index) => (
                    <Link to={"/collections/" + item.name.split(" ").join("-").toLowerCase()}>
                        <List.Item key={index} style={{cursor: "pointer", margin: "5px"}}>{item.name}</List.Item>
                    </Link>
                )}
            />
        )

        return (
            <Drop overlay={menuList}>
                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {this.props.title}
                </div>
            </Drop>
        )
    }
}

export default withDropdownItems(Dropdown);