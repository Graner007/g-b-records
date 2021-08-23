import { Link } from "react-router-dom";
import { Row, Col, Button, Layout } from 'antd';
import { useQuery, gql } from '@apollo/client';

import { Header, Content } from "../Styles";
import { H1 } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import RecordList from "./RecordList";
import ErrorMessage from "../warning/ErrorMessage";

const RECORDS_BETWEEN_TWO_PRICE_QUERY = gql`
  query RecordsBetweenTwoPriceQuery(
    $min: Int!
    $max: Int!
  ) {
    recordsBetweenTwoPrice(min: $min, max: $max) {
        id
        name
        price
        albumCover
        artist {
            name
        }
    }
  }
`;

type Props = {
    price: number;
}

type RecordsBetweenTwoPriceVars = {
    min: number;
    max: number;
}

type RecordsBetweenTwoPrice = {
    recordsBetweenTwoPrice: RecordModel[];
}

const RecordUnderPrice = (props: Props) => {
    const { data, loading, error } = useQuery<RecordsBetweenTwoPrice, RecordsBetweenTwoPriceVars>(
        RECORDS_BETWEEN_TWO_PRICE_QUERY, 
        { variables: { min: 0, max: props.price } }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout style={{backgroundColor: "white"}}>
                    <Header textAlign="center" margin={30}>
                        <H1 bold={true}>Records under {props.price}$</H1>
                    </Header>
                    <Content textAlign="center">
                        <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row"><RecordList records={data.recordsBetweenTwoPrice.slice(0, 5)} maxWidth={250} isWishlist={false} column={5} /></Col>
                        </Row>
                        <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row"><RecordList records={data.recordsBetweenTwoPrice.slice(5, 10)} maxWidth={250} isWishlist={false} column={5} /></Col>
                        </Row>
                        <Button type="primary" size="large"><Link to='/'>SHOP ALL VINYL UNDER {props.price}$</Link></Button>
                    </Content>
                </Layout>
            }
        </>
    )
}

export default RecordUnderPrice;