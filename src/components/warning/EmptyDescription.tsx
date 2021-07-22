import { Component } from 'react';
import { Empty, Button } from "antd";
import { Link } from "react-router-dom";

type Props = {
    text: string;
    isButton: boolean;
    href?: string;
}

export default class EmptyDescription extends Component<Props> {
    render() {
        return (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                height: 60,
                }}
                description={
                <span>
                    {this.props.text}
                </span>
                }
            >
                {this.props.isButton ? <Button type="primary"><Link to={"/" + this.props.href}>{this.props.href}</Link></Button> : null}
            </Empty>
        )
    }
}