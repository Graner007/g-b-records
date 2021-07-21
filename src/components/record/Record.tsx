import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Layout, Button, Row, Col, PageHeader, Image, Space } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

import { Content, Header } from "../Styles";
import { P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import ErrorPage from "../warning/ErrorPage";

interface RouteParams {
    name: string; 
}

const Record = () => {

    const [record, setRecord] = useState<RecordModel>({} as RecordModel);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<StatusCodeModel>({code: "500"});
    const { name } = useParams<RouteParams>();

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    const record = data.find(d => d.name.toString().split(" ").join("-").toLowerCase() === name);

                    if (record) {
                        setRecord(record);
                        setLoading(false);
                        setError(false);
                    }
                    else {
                        setLoading(false);
                        setError(true);
                        setStatusCode({code : "404"});
                    }
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
        
    }, [record.id, name]);

    if (error) {
        return (
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> :
        <Layout>
            <Header className="header">
                <PageHeader title={"Home > " + record.name} />
            </Header>
            <Content padding="30px 50px 30px 50px">
                <Row>
                    <Col span={12}><Image src={record.albumCover} preview={false} style={{maxWidth: "90%"}} /></Col>
                    <Col span={12}>
                        <P fontSize={50}>{record.name}</P>
                        <P fontSize={40}>{record.artist}</P>
                        <P fontSize={40} color="#01579b">{record.price}$</P>
                        <Space direction="vertical" size="middle" style={{width: "100%"}}>
                            <Button block type="primary" size="large"><ShoppingCartOutlined /> ADD TO CART</Button>
                            <Button block type="primary" danger size="large"><HeartOutlined /> WISHLIST</Button><br />
                            <P fontSize={20}>{record.description}</P>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Record;