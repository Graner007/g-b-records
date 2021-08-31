import { Component } from 'react';
import { Footer as Foot } from '../Styles';

export default class Footer extends Component {
    render() {
        return (
            <Foot backgroundcolor="#2b2929" textalign="center" color="#fff">
                Copyright © 2021 G-B Records.
            </Foot>
        )
    }
}