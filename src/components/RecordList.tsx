import React, {useEffect} from 'react';
import { List, Card } from 'antd';
import axios from 'axios';
import Meta from 'antd/lib/card/Meta';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

interface Record {
    id: number;
    name: string;
    artist: string;
    genre: string;
    description: string;
    releaseDate: string;
    albumCover: string;
    price: number;
}

const RecordList = () => {
    const [records, setRecords] = React.useState<Record[]>({} as Record[]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);

    useEffect(() => {
        axios.get("./data/record.json")
            .then(res => {
                if (res.status === 200) {
                    setRecords(res.data);
                    setLoading(false);
                    setError(false);
                }
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });
        
    }, [records]);

    if (error) {
        return (
            <h1 style = {{color:"red"}}>Can't be loaded!</h1>
        )
    }

    return (
        loading ? <div>Loading...</div> : <List
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
                        actions={[<ShoppingCartOutlined />, <HeartOutlined />]}
                        loading={loading} >
                            <Meta title={item.name} description={"by " + item.artist + " for " + item.price + "$"} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

export default RecordList;