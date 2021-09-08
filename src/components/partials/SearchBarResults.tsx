import { ApolloError } from '@apollo/client';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { RecordModel } from '../interface/RecordModel';
import { Content, Layout } from '../Styles';
import ErrorMessage from '../warning/ErrorMessage';
import Loading from '../warning/Loading';

type Props = {
    records: RecordModel[];
    error: ApolloError | undefined;
    loading: boolean;
}

const SearchBarResults = (props: Props) => {
    return (
        <>
                {props.error && <ErrorMessage text={props.error.message} />}
                {props.loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {props.records &&
                     <List
                        itemLayout="horizontal"
                        dataSource={props.records}
                        style={{maxWidth: 300, backgroundColor: "white", zIndex: 1, padding: 10}}
                        bordered={true}
                        renderItem={item => (
                            <Link to={"/products/" + item.name.toLowerCase().replaceAll(" ", "-")}><List.Item>
                                <List.Item.Meta
                                    title={<b>{item.name}</b>}
                                    description={item.artist.name}
                                    avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                                />
                            </List.Item></Link>
                        )}
                    />
                }
            </>
    )
}

export default SearchBarResults;