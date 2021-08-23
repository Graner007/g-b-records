import { useParams, useHistory } from "react-router-dom";
import { Layout, Button, Row, Col, PageHeader, Image, Space } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';

import { Content, Header, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import ErrorMessage from "../warning/ErrorMessage";

const RECORD_QUERY = gql`
  query RecordQuery(
    $recordId: Int!
  ) {
    record(recordId: $recordId) {
        id
        name
        price
        description
        albumCover
        artist {
            name
        }
    }
  }
`;

interface RouteParams {
    id: string; 
}

type RecordVars = {
    recordId: number;
}

type RecordType = {
    record: RecordModel;
}

const Record = () => {

    const { id } = useParams<RouteParams>();
    const history = useHistory();

    const { data, loading, error } = useQuery<RecordType, RecordVars>(
        RECORD_QUERY, 
        { variables: { recordId: parseInt(id) } }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                <Header className="header">
                    <PageHeader onBack={() => history.goBack()} title={"Home > " + data.record.name} />
                </Header>
                <Content padding="30px 50px 30px 50px">
                    <Row>
                        <Col span={12}><Image src={data.record.albumCover} preview={false} style={{maxWidth: "90%"}} /></Col>
                        <Col span={12}>
                            <P fontSize={50}>{data.record.name}</P>
                            <P fontSize={40}>{data.record.artist.name}</P>
                            <P fontSize={40} color="#01579b">{data.record.price}$</P>
                            <Space direction="vertical" size="middle" style={{width: "100%"}}>
                                <Button block type="primary" size="large"><ShoppingCartOutlined /> ADD TO CART</Button>
                                <Button block type="primary" danger size="large"><HeartOutlined /> WISHLIST</Button><br />
                                <P fontSize={20}>{data.record.description}</P>
                            </Space>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            }
        </>
    )
}

export default Record;