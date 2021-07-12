import { Component } from 'react';
import { Dropdown as Drop, List } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import Loading from "../Loading"; 

type Props = {
    title: string;
    itemName: "artist" | "genre";
}

type State = {
    items: any[];
    loading: boolean;
    error: null;
}

export default class Dropdown extends Component<Props, State> {

    state: State = {
        items: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + `/data/${this.props.itemName}.json`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false, error: null, items: res.data})
                }
            })
            .catch(err => this.setState({ error: err, loading: false }));
    }

    render() {
        const {error, items, loading} = this.state;

        const menuList = (
            error ? <h4 style={{color: "red"}}>Can't be loaded!</h4> : 
            (loading ? <Loading size={30} /> : <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={items}
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