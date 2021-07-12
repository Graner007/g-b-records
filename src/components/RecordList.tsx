import React, {useEffect} from 'react';
import { List, Card } from 'antd';
import axios from 'axios';
import Meta from 'antd/lib/card/Meta';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { RecordModel } from "./interface/RecordModel";
import { StatusCodeModel } from "./interface/StatusCodeModel";
import { Link } from "react-router-dom";
import Loading from "./warning/Loading";
import Error from "./warning/Error";

type Props = {
    name: string;
}

const RecordList = ({name}: Props) => {
    const [records, setRecords] = React.useState<RecordModel[]>({} as RecordModel[]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "500"});

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    let filteredRecords = data.filter(d => d.genre.toString().split(" ").join("-").toLowerCase() === name);

                    if (filteredRecords.length < 1) {
                        filteredRecords = data.filter(d => d.artist.toString().split(" ").join("-").toLowerCase() === name);
                    }

                    setRecords(filteredRecords);
                    setLoading(false);
                    setError(false);
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 404:
                        setStatusCode({code : "404"});
                        break;
                    case 500:
                        setStatusCode({code : "500"});
                        break;
                    default:
                        break;
                }
                setError(true);
                setLoading(false);
            });
        
    }, [records, name]);

    if (error) {
        return (
            <Error status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : <List
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
                            <Meta title={<Link to={"/products/" + item.name.split(" ").join("-").toLowerCase()}>{item.name}</Link>} description={"by " + item.artist + " for " + item.price + "$"} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

export default RecordList;