import { Component } from 'react';
import { RecordModel } from '../interface/RecordModel';

type Props = {
    results: RecordModel[];
    loading: boolean;
    errorMessage?: string;
}

export default class SearchResults extends Component<Props> {
    render() {
        return (
            <div>
                {this.props.errorMessage && <p>{this.props.errorMessage}</p>}
                {this.props.loading && <p>loading...</p>}
                {this.props.results && <p>{this.props.results.length}</p>}
            </div>
        )
    }
}