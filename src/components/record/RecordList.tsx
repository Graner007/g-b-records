import { ShoppingCartOutlined, HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from "./Styles";
import { List } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';

import { RecordModel } from '../interface/RecordModel';
import EmptyDescription from '../warning/EmptyDescription';

type Props = {
    records: RecordModel[];
    maxWidth: number;
    isWishlist: boolean;
    column: number;
};

const RecordList = ({records, maxWidth, isWishlist, column}: Props) => {
    return (
        records ? <List
            grid={{gutter: 16, column: column, xs: 1, sm: 2, md: 3, lg: 3 }}
            dataSource={ records }
            renderItem={item => (
                <List.Item>
                    <Link to={"/products/" + item.name.split(" ").join("-").toLowerCase()}><Card
                        className="shadow"
                        maxWidth={ maxWidth }
                        cover={ <img src={item.albumCover} alt="cover" /> } 
                        actions={[ <ShoppingCartOutlined style={{color: "green", fontSize: 20}} />, (isWishlist ? <DeleteOutlined style={{fontSize: 20, color: "red"}} /> : <HeartOutlined style={{color: "red", fontSize: 20}} />) ]}>
                            <Meta title={item.name} description={"by " + item.artist + " for " + item.price + "$"} />
                    </Card></Link>
                </List.Item>
            )}
        /> : <EmptyDescription text="No Records" />
    )
}

export default RecordList;