import React, { Component } from 'react';
import { Slider } from "antd";

type Props = {
    defaultValue: [number, number];
    isDot: boolean;
}

type State = {
    min: number;
    max: number;
}

export default class SliderLine extends Component<Props, State> {

    state: State = {
        min: this.props.defaultValue[0],
        max: this.props.defaultValue[1],
    }

    render() {
        return (
          <Slider dots={this.props.isDot} min={this.state.min} max={this.state.max} defaultValue={this.props.defaultValue} range />  
        )
    }
}