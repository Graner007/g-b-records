import { Component } from 'react';
import { Dropdown as Drop, Menu } from 'antd';

type Props = {
    title: string;
    items: string[]; 
}

export default class Dropdown extends Component<Props> {
    render() {

        const menuList = (
            <Menu>
              {this.props.items.map((item, index) => (
                  <Menu.Item key={index}>{item}</Menu.Item>
              ))}
            </Menu>
        );

        return (
            <Drop overlay={menuList}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {this.props.title}
                </a>
            </Drop>
        )
    }
}