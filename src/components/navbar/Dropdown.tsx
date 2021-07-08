import { Component } from 'react';
import { Dropdown as Drop, List } from 'antd';
import axios from 'axios';

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
        axios.get(`./data/${this.props.itemName}.json`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false, error: null, items: res.data})
                }
            })
            .catch(err => this.setState({ error: err, loading: false }));
    }

    render() {
        const {error, items, loading} = this.state;

        if (error) {
            return <h1 style = {{color:"red"}}>Can't be loaded!</h1>;
        }

        const menuList = (
            loading ? <div>Loading...</div> : <List 
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={items}
                    renderItem={(item, index) => (
                        <List.Item key={index} style={{cursor: "pointer"}}>{item.name}</List.Item>
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