import { Button, Row, Col } from "antd";
import { useQuery, gql } from '@apollo/client';

import { Layout, Content, Header, H1 } from "../Styles";
import Loading from "../../components/warning/Loading";
import RecordList from '../record/RecordList';
import { RecordModel } from "../interface/RecordModel";
import ErrorMessage from "../warning/ErrorMessage";

const WISHLIST_QUERY = gql`
    query WishlistQuery {
        wishlist { 
            products {
                id
                name
                price
                albumCover
                artist {
                    name
                }
            }
        }
    }
`;

type WishlistType = {
    wishlist: {
        products: RecordModel[];
    }
}

const Wishlist = () => {
    const { data, loading, error } = useQuery<WishlistType, {}>(WISHLIST_QUERY, {
        fetchPolicy: "no-cache"
    });

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                    <Header>
                        <Row gutter={24}>
                            <Col span={12}><H1 bold={true}>Wish List</H1></Col>
                            <Col span={12} push={8}><Button type="primary">ADD ALL TO CART</Button></Col>
                        </Row>
                    </Header>
                    <Content padding="3%">
                        <RecordList records={data.wishlist.products} maxWidth={200} isWishlist={true} />
                    </Content>
                </Layout>
            }
        </>
    )
}

export default Wishlist;