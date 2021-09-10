import { useState } from "react";
import { Menu, Layout, Row, Col, Select, Slider } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import { Content, Header, H1, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import Loading from "../warning/Loading";
import RecordList from "./RecordList";
import ErrorMessage from "../warning/ErrorMessage";

const CATEGORY_QUERY = gql`
  query CategoryQuery(
    $filter: String!
    $take: Int
    $skip: Int
    $orderBy: RecordOrderByInput
    $min: Int
    $max: Int
  ) {
    category(
        filter: $filter,
        take: $take, 
        skip: $skip, 
        orderBy: $orderBy, 
        min: $min, 
        max: $max
    ) 
    {
      count
      records {
        id
        name
        price
        description
        albumCover
        artist {
            id
            name
        }
        isInWishlist
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
    orderBy?: RecordOrderByInput;
    min?: number;
    max?: number;
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

const getQueryVariables = (args: CategoryVars) => {
    const skip: number = 0;
    const take: number = RECORDS_PER_PAGE;
    const orderBy: RecordOrderByInput = args.orderBy ? args.orderBy : { name: "desc" };

    return { 
        filter: args.filter,
        skip,
        take, 
        orderBy,
        min: args.min,
        max: args.max 
    };
};

const RecordListByCategory = () => {
    const { Sider } = Layout;
    const { Option } = Select;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
    const sortTitles = ["Title A-Z", "Title Z-A", "Price High-Low", "Price Low-High", "Newest to Oldest", "Oldest to Newest"];
    const [records, setRecords] = useState<RecordModel[]>();
    const [resultFound, setResultFound] = useState<number>();

    let { data, loading, error, refetch } = useQuery<Category, CategoryVars>(
        CATEGORY_QUERY, 
        { 
            variables: getQueryVariables({ filter: displayName }),
            onCompleted: (data: Category) => {
                setRecords(data.category.records);
                setResultFound(data.category.count);
            }
        }
    );

    const refetchRecords = (args: CategoryVars) => {
        refetch(getQueryVariables({ filter: args.filter, orderBy: args.orderBy}))
            .then(res => {
                setRecords(res.data.category.records);
                setResultFound(res.data.category.count);
            })
            .catch(err => console.error(err));
    }

    const search = (value: string) => {
        switch(value) {
            case "Title A-Z":
                refetchRecords({ filter: displayName, orderBy: { name: "asc" } });
                break;
            case "Title Z-A":
                refetchRecords({ filter: displayName, orderBy: { name: "desc" } });
                break;
            case "Price High-Low":
                refetchRecords({ filter: displayName, orderBy: { price: "desc" } });
                break;
            case "Price Low-High":
                refetchRecords({ filter: displayName, orderBy: { name: "asc" } });
                break;
            case "Newest to Oldest":
                refetchRecords({ filter: displayName, orderBy: { releaseDate: "desc" } });
                break;
            case "Oldest to Newest":
                refetchRecords({ filter: displayName, orderBy: { releaseDate: "asc" } });
                break;
        }
    }

    const filterByTwoPrice = (min: number, max: number) => {
        if (data && min && max) {
            const filteredRecords = data.category.records.filter(record => record.price >= min && record.price <= max);
            setRecords(filteredRecords);
            setResultFound(filteredRecords.length);
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
                                <P fontsize={14} color="black">{displayName}</P>
                            </Menu.Item>
                            {data.category.count > 1 ? <Menu.Item key="5" style={{height:"fit-content"}}>
                                <H1 bold={false} fontsize={16}>Price</H1>
                                <Slider onChange={value => filterByTwoPrice(value[0], value[1])} dots={false} min={data.category.minPrice} max={data.category.maxPrice} defaultValue={[data.category.minPrice, data.category.maxPrice]} range /> 
                            </Menu.Item> : null}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{height: "fit-content"}}>
                            <H1 fontsize={18} bold={false}>Home {'>'} {displayName}</H1>
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <b>{resultFound} results found</b>
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
                            <RecordList maxWidth={200} records={records!} isWishlist={false} column={6} />
                        </Content>
                    </Layout>
                </Layout>}
        </>
    )
}

export default RecordListByCategory;