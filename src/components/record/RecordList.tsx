import React from 'react';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { List, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { RecordModel } from '../interface/RecordModel';

type Props = {
    records: RecordModel[];
};

const RecordList = ({records}: Props) => {
    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6
            }}
            dataSource={records}
            renderItem={item => (
                <List.Item>
                    <Card 
                        cover={<img src={item.albumCover} alt="cover" />} 
                        actions={[<ShoppingCartOutlined />, <HeartOutlined />]}>
                            <Meta title={<Link to={"/products/" + item.name.split(" ").join("-").toLowerCase()}>{item.name}</Link>} description={"by " + item.artist + " for " + item.price + "$"} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

export default RecordList;