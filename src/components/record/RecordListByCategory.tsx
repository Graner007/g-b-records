import { Menu, Layout } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import { Content, Header, H1, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import RecordList from "./RecordList";
import OrderBar from "./OrderBar";
import SearchBar from "../navbar/SearchBar";
import SliderLine from '../partials/SliderLine';
import ErrorMessage from "../warning/ErrorMessage";

const CATEGORY_QUERY = gql`
  query CategoryQuery(
    $filter: String!
    $take: Int
    $skip: Int
    $orderBy: RecordOrderByInput
  ) {
    category(filter: $filter, take: $take, skip: $skip, orderBy: $orderBy) {
      count
      records {
        id
        name
        price
        description
        albumCover
        artist {
            name
        }
      }
      minPrice
      maxPrice
    }
  }
`;

type RecordOrderByInput = {
    name?: "desc" | "asc";
    price?: "desc" | "asc";
    releaseDate?: "desc" | "asc";
}

type CategoryVars = {
    filter: string;
    take?: number;
    skip?: number;
    orderBy?: RecordOrderByInput
}

type Category = {
    category: {
        count: number;
        records: RecordModel[];
        minPrice: number;
        maxPrice: number;
    }
}

type RouteParams = {
    name: string; 
}

const RECORDS_PER_PAGE = 10;

const getQueryVariables = (phrase: string) => {
    const filter: string = phrase;
    const skip: number = 0;
    const take: number = RECORDS_PER_PAGE;
    const orderBy: RecordOrderByInput = { name: "desc" };

    return { filter, skip, take, orderBy };
};

const RecordListByCategory = () => {
    const { Sider } = Layout;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");

    const { data, loading, error } = useQuery<Category, CategoryVars>(
        CATEGORY_QUERY, 
        { variables: getQueryVariables(displayName) }
    );

    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                    <Sider theme="light" breakpoint="lg" collapsedWidth="0" >
                        <Menu theme="light" mode="inline" selectable={false} style={{cursor: "no-pointer"}}>
                            <Menu.Item key="1">
                                <H1 bold={false} fontSize={18}>Filters</H1>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <H1 bold={false} fontSize={16}>Artist</H1>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <SearchBar placeholder="artist" size="small" width="75%" padding="10px 0 10px 0" />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <P fontSize={14} color="black">{displayName}</P>
                            </Menu.Item>
                            {data.category.count > 1 ? <Menu.Item key="5" style={{height:"fit-content"}}>
                                <H1 bold={false} fontSize={16}>Price</H1>
                                <SliderLine defaultValue={[data.category.minPrice, data.category.maxPrice]} isDot={false} />
                            </Menu.Item> : null}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{height: "fit-content"}}>
                            <H1 fontSize={18} bold={false}>Home {'>'} {displayName}</H1>
                            <OrderBar recordsLength={data.category.count} />
                        </Header>
                        <Content backgroundColor="#ececec" padding="3%">
                            <RecordList maxwidth={200} records={data.category.records} iswishlist={false} column={6} />
                        </Content>
                    </Layout>
                </Layout>}
        </>
    )
}

export default RecordListByCategory;