import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, Layout } from "antd";
import { useParams } from "react-router-dom";

import { Content, Header, H1, P } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import ErrorPage from "../warning/ErrorPage";
import RecordList from "./RecordList";
import OrderBar from "./OrderBar";
import SearchBar from "../navbar/SearchBar";
import SliderLine from '../partials/SliderLine';

interface RouteParams {
    name: string; 
}

const RecordListByCategory = () => {

    const { Sider } = Layout;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");

    const [records, setRecords] = useState<RecordModel[]>([] as RecordModel[]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<StatusCodeModel>({code: "500"});

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/data/record.json")
            .then(res => {
                if (res.status === 200) {
                    let data: RecordModel[] = [];
                    data = res.data;

                    let filteredRecords = data.filter(d => d.genre.toString().split(" ").join("-").toLowerCase() === name);

                    if (filteredRecords.length < 1) {
                        filteredRecords = data.filter(d => d.artist.toString().split(" ").join("-").toLowerCase() === name);
                    }

                    if (filteredRecords.length > 1) {
                        setMaxPrice(filteredRecords.reduce(
                            (max, record) => (record.price > max ? record.price : max),
                            filteredRecords[0].price
                        ));
    
                        setMinPrice(filteredRecords.reduce(
                            (min, record) => (record.price < min ? record.price : min),
                            filteredRecords[0].price
                        ));
                    }

                    setRecords(filteredRecords);
                    setLoading(false);
                    setError(false);
                }
            })
            .catch(err => {
                console.log(err.response.status);
                switch (err.response.status) {
                    case 404:
                        setStatusCode({code : "404"});
                        break;
                    case 500:
                        setStatusCode({code : "500"});
                        break;
                    default:
                        break;
                }
                setError(true);
                setLoading(false);
            });
        
    }, [records.length, name, minPrice, maxPrice]);

    if (error) {
        return (
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : 
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
                        {records.length > 1 ? <Menu.Item key="5" style={{height:"fit-content"}}>
                            <H1 bold={false} fontSize={16}>Price</H1>
                            <SliderLine defaultValue={[minPrice, maxPrice]} isDot={false} />
                        </Menu.Item> : null}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{height: "fit-content"}}>
                        <H1 fontSize={18} bold={false}>Home {'>'} {displayName}</H1>
                        <OrderBar recordsLength={records.length} />
                    </Header>
                    <Content backgroundColor="#ececec" padding="3%">
                        <RecordList maxWidth={200} records={records} isWishlist={false} />
                    </Content>
                </Layout>
            </Layout>
    )
}

export default RecordListByCategory;