import { Row, Col, Layout } from 'antd';
import { useQuery, gql } from '@apollo/client';

import { Header, Content } from "../Styles";
import { H1 } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import RecordList from "./RecordList";
import ErrorMessage from '../warning/ErrorMessage';

const RECOMMEND_RECORDS_QUERY = gql`
    query RecommendRecordQuery {
        recommendedRecords { 
            id
            name
            price
            albumCover
            artist {
                id
                name
            }
            isInWishlist
        }
    }
`;

type RecommendRecords = {
    recommendedRecords: RecordModel[];
}

const RecommendRecordList = () => {
    const { data, loading, error } = useQuery<RecommendRecords, {}>(RECOMMEND_RECORDS_QUERY, { pollInterval: 5000 });

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout style={{backgroundColor: "white"}}>
                    <Header textalign="center" margin={30}>
                        <H1 bold={true}>Recommended Records</H1>
                    </Header>
                    <Content>
                        <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                             <Col className="gutter-row"><RecordList records={data.recommendedRecords} maxWidth={200} isWishlist={false} column={data.recommendedRecords.length} /></Col>
                        </Row>
                    </Content>
                </Layout>
            }
        </>
    )
}

export default RecommendRecordList;