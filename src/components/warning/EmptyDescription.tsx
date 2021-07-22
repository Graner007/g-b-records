import { Component } from 'react';
import { Empty } from "antd";

type Props = {
    text: string;
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
            </Empty>
        )
    }
}