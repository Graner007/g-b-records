import { Input } from 'antd';
import { gql, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from "react";

import { RecordModel } from '../interface/RecordModel';
import SearchBarResults from "./SearchBarResults";

const SEARCH_RECORDS = gql`
  query SearchRecords($searchPhrase: String!) {
    searchRecords(searchPhrase: $searchPhrase) {
      id
      name
      albumCover
      artist {
        name
      }
    }
  }
`;

type SearchType = {
    searchRecords: RecordModel[];
}

type SearchVars = {
    searchPhrase: string;
}

type Props = {
    placeholder?: string;
    size: "large" | "middle" | "small";
    width?: string;
    padding?: string;
}

const SearchBar = (props: Props) => {
    const {Search} = Input;
    const [phrase, setPhrase] = useState<string>("");
    const [records, setRecords] = useState<RecordModel[]>();

    const [executeSearch, { data, loading, error }] = useLazyQuery<SearchType, SearchVars>(SEARCH_RECORDS,
      { variables: { searchPhrase: phrase }, 
        onCompleted: (data: SearchType) => { 
          setRecords(data.searchRecords); 
        } 
      });

    useEffect(() => {
      executeSearch();
    }, [phrase, executeSearch]);

    return (
      <>
        <Search 
            placeholder={props.placeholder} 
            size={props.size} 
            allowClear 
            style={{ width: props.width, padding: props.padding }}
            onChange={(e) => e !== null && setPhrase(e.target.value)}
            onBlur={() => {
              setPhrase("");
              setRecords([]);
            }}
        />
        { data && phrase.length > 0 && <SearchBarResults records={records!} error={error} loading={loading} /> }
      </>
    )
}

export default SearchBar;