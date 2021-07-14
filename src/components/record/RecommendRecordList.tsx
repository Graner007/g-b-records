import React, {useEffect} from 'react';
import axios from 'axios';
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import Error from "../warning/Error";
import RecordList from "./RecordList";
import { Layout, Row, Col } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';

const RecommendRecordList = () => {

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
            <Layout style={{paddingTop: 30, backgroundColor: "#fff"}}>
                <Header className="header" style={{backgroundColor: "white", textAlign: "center"}}>
                    <h1 style={{fontSize: 24, color: "black"}}>Recommended Records</h1>
                </Header>
                <Content style={{backgroundColor: "#fff", paddingTop: 30}}>
                    <Row justify="center" >
                        <Col><RecordList records={records} maxWidth={300} /></Col>
                    </Row>
                </Content>
            </Layout>
    )
}

export default RecommendRecordList;