import { Input } from 'antd';
import { gql, useLazyQuery } from '@apollo/client';
import { RecordModel } from '../interface/RecordModel';

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
    searchRecods: RecordModel[];
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

    const [executeSearch, { data }] = useLazyQuery<SearchType, SearchVars>(SEARCH_RECORDS); 

    return (
        <Search 
            placeholder={props.placeholder} 
            size={props.size} 
            allowClear 
            style={{ width: props.width, padding: props.padding }}
            onChange={(e) => e !== null && executeSearch({ variables: { searchPhrase: e.target.value } })} 
        />
    )
}

export default SearchBar;