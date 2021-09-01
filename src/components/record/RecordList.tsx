import { ShoppingCartOutlined, HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from "./Styles";
import { List, message, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { useMutation, gql, ApolloError } from '@apollo/client';

import { RecordModel } from '../interface/RecordModel';
import EmptyDescription from '../warning/EmptyDescription';
import { WishlistModel } from '../interface/WishlistModel';

const ADD_CART_ITEM = gql`
  mutation addCartItemMutation($name: String!, $albumCover: String!, $price: Int!) {
    addCartItem(name: $name, albumCover: $albumCover, price: $price) {
      id
    }
  }
`;

const TOGGLE_PRODUCT_IN_WISHLIST = gql`
  mutation toggleProductInWhislistMutation($recordId: Int!) {
    toggleProductInWhislist(recordId: $recordId) {
      products {
          id
          name
      }
    }
  }
`;

type AddCartItemType = {
    name: string;
    albumCover: string;
    price: number;
}

type ToggleProductInWhislistType = {
    recordId: number;
}

type WishlistType = {
    wishlist: WishlistModel;
}

type Props = {
    records: RecordModel[];
    maxWidth: number;
    isWishlist: boolean;
    column?: number;
};

const RecordList = ({records, maxWidth, isWishlist, column}: Props) => {
    const [addCartItem] = useMutation<{}, AddCartItemType>(
        ADD_CART_ITEM, 
        { 
            onCompleted: () => {
                message.success("Record added to cart");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    const [toggleProductInWhislist] = useMutation<WishlistType, ToggleProductInWhislistType>(
        TOGGLE_PRODUCT_IN_WISHLIST, 
        { 
            onCompleted: (data: WishlistType) => {
                message.success("Wishlist");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            }
        }
    );

    return (
        records ? <List
            grid={{gutter: 24, column: column, xs: 1, sm: 2, md: 3, lg: 3 }}
            dataSource={ records }
            renderItem={item => (
                <List.Item>
                    <Card
                        className="shadow"
                        maxwidth={ maxWidth }
                        cover={ <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Image src={item.albumCover} alt="cover" preview={false} /></Link> } 
                        actions={[ 
                            <ShoppingCartOutlined 
                                style={{color: "green", fontSize: 20}} 
                                onClick={() => addCartItem({variables: {name: item.name, albumCover: item.albumCover, price: item.price}})} />, 
                                    (isWishlist ? 
                                        <DeleteOutlined style={{fontSize: 20, color: "red"}} /> : 
                                        <HeartOutlined style={{color: "red", fontSize: 20}} onClick={() => toggleProductInWhislist({variables: {recordId: parseInt(String(item.id))}})} />
                                    ) ]}>
                            <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Meta title={item.name} description={"by " + item.artist.name + " for " + item.price + "$"} /></Link>
                    </Card>
                </List.Item>
            )}
        /> : <EmptyDescription text="No Records" />
    )
}

export default RecordList;