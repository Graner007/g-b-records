import { Menu, Layout, Row, Col, Select } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import { Content, Header, H1, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import RecordList from "./RecordList";
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

const getQueryVariables = (phrase: string, sortBy?: RecordOrderByInput) => {
    const filter: string = phrase;
    const skip: number = 0;
    const take: number = RECORDS_PER_PAGE;
    const orderBy: RecordOrderByInput = sortBy ? sortBy : { name: "desc" };

    return { filter, skip, take, orderBy };
};

const RecordListByCategory = () => {
    const { Sider } = Layout;
    const { Option } = Select;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
    const sortTitles = ["Title A-Z", "Title Z-A", "Price High-Low", "Price Low-High", "Newest to Oldest", "Oldest to Newest"];

    let { data, loading, error, refetch } = useQuery<Category, CategoryVars>(
        CATEGORY_QUERY, 
        { variables: getQueryVariables(displayName) }
    );

    const search = (value: string) => {
        switch(value) {
            case "Title A-Z":
                refetch(getQueryVariables(displayName, { name: "desc" }));
                break;
            case "Title Z-A":
                refetch(getQueryVariables(displayName, { name: "asc" }));
                break;
            case "Price High-Low":
                refetch(getQueryVariables(displayName, { price: "desc" }));
                break;
            case "Price Low-High":
                refetch(getQueryVariables(displayName, { price: "asc" }));
                break;
            case "Newest to Oldest":
                refetch(getQueryVariables(displayName, { releaseDate: "desc" }));
                break;
            case "Oldest to Newest":
                refetch(getQueryVariables(displayName, { releaseDate: "asc" }));
                break;
        }
    }
    
    return (
        <>
            {error && <ErrorMessage text={error.message} />}
            {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
            {data && 
                <Layout>
                    <Sider theme="light" breakpoint="lg" collapsedWidth="0" >
                        <Menu theme="light" mode="inline" selectable={false} style={{cursor: "no-pointer"}}>
                            <Menu.Item key="1">
                                <H1 bold={false} fontsize={18}>Filters</H1>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <H1 bold={false} fontsize={16}>Artist</H1>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <SearchBar placeholder="artist" size="small" width="75%" padding="10px 0 10px 0" />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <P fontsize={14} color="black">{displayName}</P>
                            </Menu.Item>
                            {data.category.count > 1 ? <Menu.Item key="5" style={{height:"fit-content"}}>
                                <H1 bold={false} fontsize={16}>Price</H1>
                                <SliderLine defaultValue={[data.category.minPrice, data.category.maxPrice]} isDot={false} />
                            </Menu.Item> : null}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{height: "fit-content"}}>
                            <H1 fontsize={18} bold={false}>Home {'>'} {displayName}</H1>
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <b>{data.category.records.length} results found</b>
                                </Col>
                                <Col span={12} push={8}>
                                    Sort By
                                    <Select onChange={value => search(value)} defaultValue={sortTitles[0]} style={{ width: 'auto' }} bordered={false} size={"large"}>
                                        {sortTitles.map((item, index) => (
                                            <Option value={item} key={index}>{item}</Option>
                                        ))}
                                    </Select>
                                </Col>
                            </Row>
                        </Header>
                        <Content backgroundcolor="#ececec" padding="3%">
                            <RecordList maxWidth={200} records={data.category.records} isWishlist={false} column={6} />
                        </Content>
                    </Layout>
                </Layout>}
        </>
    )
}

export default RecordListByCategory;