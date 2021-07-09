import React, { Component } from 'react';
import { Footer as Foot } from 'antd/lib/layout/layout';

export default class Footer extends Component {
    render() {
        return (
            <Foot style={{textAlign: "center", backgroundColor: "#2b2929", color: '#fff'}}>
                Copyright © 2021 G-B Records.
            </Foot>
        )
    }
}