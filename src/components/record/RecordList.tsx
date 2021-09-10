import { ShoppingCartOutlined, HeartOutlined, DeleteOutlined, HeartFilled } from '@ant-design/icons';
import { Card } from "./Styles";
import { List, message, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { useMutation, gql, ApolloError } from '@apollo/client';

import { RecordModel } from '../interface/RecordModel';
import EmptyDescription from '../warning/EmptyDescription';
import { WishlistModel } from '../interface/WishlistModel';
import { WISHLIST_QUERY } from '../user/Wishlist';
import { WishlistType } from '../user/Wishlist';
import { CART_QUERY } from '../user/cart/Cart';

export const ADD_CART_ITEM = gql`
  mutation addCartItemMutation($name: String!, $albumCover: String!, $price: Int!) {
    addCartItem(name: $name, albumCover: $albumCover, price: $price) {
      id
    }
  }
`;

export const TOGGLE_PRODUCT_IN_WISHLIST = gql`
  mutation toggleProductInWhislistMutation($recordId: Int!) {
    toggleProductInWhislist(recordId: $recordId) {
        id
        wishlist {
            products {
                id
                name
            }
        }
        operationType
    }
  }
`;

const DELETE_WISHLIST_ITEM = gql`
  mutation deleteWishlistItemMutation($recordId: Int!) {
      deleteWishlistItem(recordId: $recordId) {
        id
        name
        price
        description
        albumCover
      }
  }
`

export type AddCartItemType = {
    name: string;
    albumCover: string;
    price: number;
}

export type ProductWishlistType = {
    recordId: number;
}

export type ToggleProductInWhislistType = {
    toggleProductInWhislist: {
        wishlist: WishlistModel;
        operationType: string;
    }
}

type DeleteWishlistItemType = {
    deleteWishlistItem: RecordModel;
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

    const [deleteWishlistItem] = useMutation<DeleteWishlistItemType, ProductWishlistType>(
        DELETE_WISHLIST_ITEM,
        {
            onCompleted: () => {
                message.success("Record removed from wishlist");
            },
            onError: (error: ApolloError) => {
                message.error(error.message);
            },
            update: (proxy, { data }) => {
                const wishlist = proxy.readQuery<WishlistType>({ query: WISHLIST_QUERY });
                if (data && wishlist) {
                    proxy.writeQuery({ query: WISHLIST_QUERY, data: { wishlist: { wishlist: wishlist.wishlist.products.filter(product => product.id !== data.deleteWishlistItem.id) } } });
                }
            }
        }
    )

    return (
        records ? <List
            grid={{gutter: 24, column: column, xs: 1, sm: 2, md: 3, lg: 3 }}
            dataSource={ records }
            renderItem={item => (
                <List.Item>
                    <Card
                        itemID={item.id.toString()}
                        className="shadow"
                        maxwidth={ maxWidth }
                        cover={ <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Image src={item.albumCover} alt="cover" preview={false} /></Link> } 
                        actions={[ 
                            <ShoppingCartOutlined 
                                style={{color: "green", fontSize: 20}} 
                                onClick={() => addCartItem({variables: {name: item.name, albumCover: item.albumCover, price: item.price}})} />, 
                                    (isWishlist ? 
                                        <DeleteOutlined style={{fontSize: 20, color: "red"}} onClick={() => deleteWishlistItem({variables: {recordId: parseInt(String(item.id))}})} /> :
                                        (item.isInWishlist ? <HeartFilled style={{color: "red", fontSize: 20}} onClick={() => toggleProductInWhislist({variables: {recordId: parseInt(String(item.id))}})} /> : <HeartOutlined style={{color: "red", fontSize: 20}} onClick={() => toggleProductInWhislist({variables: {recordId: parseInt(String(item.id))}})} />)                                    
                                    ) ]}>
                            <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><Meta title={item.name} description={"by " + item.artist.name + " for " + item.price + "$"} /></Link>
                    </Card>
                </List.Item>
            )}
        /> : <EmptyDescription text="No Records" />
    )
}

export default RecordList;