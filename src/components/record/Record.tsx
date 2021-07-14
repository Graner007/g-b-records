import React, {useEffect} from 'react'
import { Content, Header } from 'antd/lib/layout/layout';
import { Layout, Button, Row, Col, PageHeader, Image } from "antd";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import Loading from "../warning/Loading";
import Error from "../warning/Error";

interface RouteParams {
    name: string; 
}

const Record = () => {

    const [record, setRecord] = React.useState<RecordModel | undefined>({} as RecordModel);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "500"});
    const { name } = useParams<RouteParams>();

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    const record = data.find(d => d.name.toString().split(" ").join("-").toLowerCase() === name);

                    setRecord(record);
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
        
    }, [record?.id, name]);

    if (error) {
        return (
            <Error status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> :
        <Layout>
            <Header className="header" style={{backgroundColor: "#fff"}}>
                <PageHeader title={"Home > " + record?.name} />
            </Header>
            <Content style={{padding: "30px 50px 30px 50px", backgroundColor:"#fff"}}>
                <Row>
                    <Col span={12}><Image src={record?.albumCover} preview={false} style={{maxWidth: "90%"}} /></Col>
                    <Col span={12}>
                        <h1 style={{fontSize: 50}}>{record?.name}</h1>
                        <p style={{fontSize: 40}}>{record?.artist}</p>
                        <p style={{fontSize: 30, color: "#01579b"}}>{record?.price} $</p>
                        <Button block type="primary" size="large" style={{marginBottom: 20}}><ShoppingCartOutlined /> ADD TO CART</Button>
                        <Button block type="primary" danger size="large" style={{marginBottom: 20}}><HeartOutlined /> WISHLIST</Button>
                        <p style={{fontSize: 20}}>{record?.description}</p>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Record;