import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Row, Col, Button, Layout } from 'antd';

import { Header, Content } from "../Styles";
import { H1 } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import ErrorPage from "../warning/ErrorPage";
import RecordList from "./RecordList";

type Props = {
    price: number;
}

const RecommendRecordList = (props: Props) => {

    const [records, setRecords] = useState<RecordModel[]>([] as RecordModel[]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<StatusCodeModel>({code: "500"});

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    const filteredRecords = data.filter(d => d.price <= props.price);

                    setRecords(filteredRecords.slice(0, 10).reverse());
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
        
    }, [records.length, props.price]);

    if (error) {
        return (
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : 
            <Layout style={{backgroundColor: "white"}}>
                <Header textAlign="center" margin={30}>
                    <H1 bold={true}>Records under {props.price}$</H1>
                </Header>
                <Content textAlign="center">
                    <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row"><RecordList records={records.slice(0, 5)} maxWidth={250} isWishlist={false} /></Col>
                    </Row>
                    <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row"><RecordList records={records.slice(5, 10)} maxWidth={250} isWishlist={false} /></Col>
                    </Row>
                    <Button type="primary" size="large"><Link to='/'>SHOP ALL VINYL UNDER {props.price}$</Link></Button>
                </Content>
            </Layout>
    )
}

export default RecommendRecordList;