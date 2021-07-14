import React, {useEffect} from 'react';
import axios from 'axios';
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import Error from "../warning/Error";
import RecordList from "./RecordList";
import { Layout as layout, Row, Col } from 'antd';
import { Content as content, Header as header } from 'antd/lib/layout/layout'; 
import styled from '@emotion/styled';

const RecommendRecordList = () => {

    const Header = styled(header)`
        background-color: #fff;
        text-align: center;
    `;

    const Layout = styled(layout)`
        padding-top: 30px;
        background-color: #fff;
    `;

    const Content = styled(content)`
        padding-top: 30px;
        background-color: #fff;
    `;

    const H1 = styled.h1`
        font-size: 24px;
        color: black;
    `;

    const [records, setRecords] = React.useState<RecordModel[]>([] as RecordModel[]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "500"});

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    const filteredRecords = data.filter(d => d.id < 6);

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
        
    }, [records.length]);

    if (error) {
        return (
            <Error status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : 
            <Layout>
                <Header className="header">
                    <H1>Recommended Records</H1>
                </Header>
                <Content>
                    <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row"><RecordList records={records} maxWidth={300} /></Col>
                    </Row>
                </Content>
            </Layout>
    )
}

export default RecommendRecordList;