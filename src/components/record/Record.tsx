import { useParams, useHistory } from "react-router-dom";
import { Layout, Button, Row, Col, PageHeader, Image, Space, message } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useQuery, gql, useMutation, ApolloError } from '@apollo/client';

import { Content, Header, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import ErrorMessage from "../warning/ErrorMessage";
import { AddCartItemType, ProductWishlistType, ToggleProductInWhislistType, ADD_CART_ITEM, TOGGLE_PRODUCT_IN_WISHLIST } from "./RecordList";
import { CART_QUERY } from "../user/cart/Cart";
import { WISHLIST_QUERY } from "../user/Wishlist";

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

    const [addCartItem] = useMutation<{}, AddCartItemType>(
        ADD_CART_ITEM, 
        { 
            onCompleted: () => {
                message.success("Record added to cart");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            refetchQueries: [{query: CART_QUERY}]
        }
    );

    const [toggleProductInWhislist] = useMutation<ToggleProductInWhislistType, ProductWishlistType>(
        TOGGLE_PRODUCT_IN_WISHLIST, 
        { 
            onCompleted: (data: ToggleProductInWhislistType) => {
                switch(data.toggleProductInWhislist.operationType) {
                    case "add":
                        message.success("Record added to wishlist");
                        break;
                    case "remove":
                        message.success("Record removed from wishlist");
                        break;
                }
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            refetchQueries: [{query: WISHLIST_QUERY}]
        }
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
                                <Button block type="primary" size="large" onClick={() => addCartItem({variables: { recordId: parseInt(String(data.recordByName.id)) }})}><ShoppingCartOutlined /> ADD TO CART</Button>
                                <Button block type="primary" danger size="large" onClick={() => toggleProductInWhislist({variables: {recordId: parseInt(String(data.recordByName.id))}})}><HeartOutlined /> WISHLIST</Button><br />
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