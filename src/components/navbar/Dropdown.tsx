import { Component } from 'react';
import { Dropdown as Drop, List } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";

import Loading from "../warning/Loading";
import ErrorMessage from "../warning/ErrorMessage"; 

type Props = {
    title: string;
    itemName: "artist" | "genre";
}

type State = {
    items: any[];
    loading: boolean;
    error: boolean;
}

export default class Dropdown extends Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + `/data/${this.props.itemName}.json`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false, error: false, items: res.data});
                }
            })
            .catch(err => this.setState({ error: true, loading: false, }));
    }

    render() {

        const menuList = (
            this.state.error ? <ErrorMessage text={"Sorry, " + this.props.itemName + "s can't be loaded."} /> : 
            (this.state.loading ? <Loading size={30} /> : <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.items}
                    renderItem={(item, index) => (
                        <Link to={"/collections/" + item.name.split(" ").join("-").toLowerCase()}>
                            <List.Item key={index} style={{cursor: "pointer", margin: "5px"}}>{item.name}</List.Item>
                        </Link>
                    )}
            />)
        )

        return (
            <Drop overlay={menuList} >
                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {this.props.title}
                </div>
            </Drop>
        )
    }
}