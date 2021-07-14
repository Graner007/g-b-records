import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { List, Card as card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { RecordModel } from '../interface/RecordModel';
import styled from '@emotion/styled';

type Props = {
    records: RecordModel[];
    maxWidth: number;
};

const RecordList = ({records, maxWidth}: Props) => {

    const Card = styled(card)`
        max-width: ${maxWidth}px;
    `;

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