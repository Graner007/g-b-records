import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';

import { Header, Content, Layout } from "../Styles";
import { H1 } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import ErrorPage from "../warning/ErrorPage";
import RecordList from "./RecordList";

const RecommendRecordList = () => {

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
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : 
            <Layout>
                <Header textAlign="center" margin={30}>
                    <H1 bold={true}>Recommended Records</H1>
                </Header>
                <Content>
                    <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row"><RecordList records={records} maxWidth={300} isWishlist={false} /></Col>
                    </Row>
                </Content>
            </Layout>
    )
}

export default RecommendRecordList;