import React, {useEffect} from 'react';
import axios from 'axios';

import { Layout, Content, Header } from "../Styles";
import { RecordModel } from "../interface/RecordModel";
import { StatusCodeModel } from "../interface/StatusCodeModel";
import Loading from "../warning/Loading";
import ErrorPage from "../warning/ErrorPage";
import RecordList from "./RecordList";
import OrderBar from "../OrderBar";

type Props = {
    name: string;
}

const RecordListByCategory = ({name}: Props) => {
    const [records, setRecords] = React.useState<RecordModel[]>([] as RecordModel[]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);
    const [statusCode, setStatusCode] = React.useState<StatusCodeModel>({code: "500"});

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

                    setRecords(filteredRecords);
                    setLoading(false);
                    setError(false);
                }
            })
            .catch(err => {
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
        
    }, [records.length, name]);

    if (error) {
        return (
            <ErrorPage status={statusCode.code} />
        )
    }

    return (
        loading ? <Loading size={35} /> : 
            <Layout>
                <Header><OrderBar recordsLength={records.length} /></Header>
                <Content backgroundColor="#ececec" padding="3%">
                    <RecordList maxWidth={200} records={records} />
                </Content>
            </Layout>
    )
}

export default RecordListByCategory;