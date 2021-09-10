import { Button, Row, Col, message } from "antd";
import { useQuery, gql, useMutation, ApolloError } from '@apollo/client';

import { Layout, Content, Header, H1 } from "../Styles";
import Loading from "../../components/warning/Loading";
import RecordList from '../record/RecordList';
import { RecordModel } from "../interface/RecordModel";
import ErrorMessage from "../warning/ErrorMessage";

export const WISHLIST_QUERY = gql`
    query WishlistQuery {
        wishlist { 
            id
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

const ADD_ALL_TO_CART_MUTATION = gql`
    mutation AddAllToCartMutation {
        addAllProductsToCart {
            id
        }
    }
`;

export type WishlistType = {
    wishlist: {
        products: RecordModel[];
    }
}

const Wishlist = () => {
    const { data, loading, error } = useQuery<WishlistType, {}>(WISHLIST_QUERY);

    const [addAllToCart] = useMutation<{}, {}>(
        ADD_ALL_TO_CART_MUTATION, 
        { 
            onCompleted: () => {
                message.success("All item(s) add to Cart");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                    <Header>
                        <Row gutter={24}>
                            <Col span={12}><H1 bold={true}>Wish List</H1></Col>
                            <Col span={12} push={8}><Button type="primary" onClick={() => addAllToCart()}>ADD ALL TO CART</Button></Col>
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