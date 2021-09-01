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
    $recordName: String!
  ) {
    recordByName(recordName: $recordName) {
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
    name: string; 
}

type RecordVars = {
    recordName: string;
}

type RecordType = {
    recordByName: RecordModel;
}

const Record = () => {

    const { name } = useParams<RouteParams>();
    const history = useHistory();

    const { data, loading, error } = useQuery<RecordType, RecordVars>(
        RECORD_QUERY, 
        { variables: { recordName: name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ") } }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                <Header className="header">
                    <PageHeader onBack={() => history.goBack()} title={"Home > " + data.recordByName.name} />
                </Header>
                <Content padding="30px 50px 30px 50px">
                    <Row>
                        <Col span={12}><Image src={data.recordByName.albumCover} preview={false} style={{maxWidth: "90%"}} /></Col>
                        <Col span={12}>
                            <P fontsize={50}>{data.recordByName.name}</P>
                            <P fontsize={40}>{data.recordByName.artist.name}</P>
                            <P fontsize={40} color="#01579b">{data.recordByName.price}$</P>
                            <Space direction="vertical" size="middle" style={{width: "100%"}}>
                                <Button block type="primary" size="large"><ShoppingCartOutlined /> ADD TO CART</Button>
                                <Button block type="primary" danger size="large"><HeartOutlined /> WISHLIST</Button><br />
                                <P fontsize={20}>{data.recordByName.description}</P>
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