import { Component } from 'react';
import { Input } from 'antd';
import { gql } from '@apollo/client';
import { ChildProps, graphql } from "@apollo/react-hoc";

import { RecordModel } from '../interface/RecordModel';
import SearchResults from "./SearchResults";

const SEARCH_RECORDS = gql`
  query SearchRecords($searchPhrase: String!) {
    searchRecords(searchPhrase: $searchPhrase) {
      id
      name
      albumCover
    }
  }
`;

type SearchType = {
    records: RecordModel[];
}

const withSearchResults = graphql<Props, SearchType>(SEARCH_RECORDS, {
    options: {
        variables: {
            searchPhrase: ""
        },
        onError: () => {},
        
    }
});

type Props = {
    placeholder?: string;
    size: "large" | "middle" | "small";
    width?: string;
    padding?: string;
}

class SearchBar extends Component<ChildProps<Props, SearchType>, {}> {
    render() {
        const {Search} = Input;
        const { loading, records, error, refetch } = this.props.data!;

        return (
            <>
                <Search 
                    placeholder={this.props.placeholder} 
                    size={this.props.size} 
                    allowClear 
                    style={{ 
                        width: this.props.width, 
                        padding: this.props.padding 
                    }}
                    onChange={(e) => refetch({variables: { searchPhrase: e.target.value }})} 
                />
                { records && records.length > 0 && <SearchResults results={records} loading={loading} errorMessage={error?.message} /> }
            </>
        )
    }
}

export default withSearchResults(SearchBar);