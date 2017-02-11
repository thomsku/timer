/*
* Handles all number input logic and sends
* a calculated total number of seconds
* based on that input to its parent.
*/
import React, { Component } from 'react';
import Input from 'rc-input-number';


export default class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.setMinutes = this.setMinutes.bind(this);
        this.setSeconds = this.setSeconds.bind(this);
    }

    setMinutes(value){
        if(value){
            this.minutes = value;
        }
        this.props.onChange(this.calculateTime())
    }

    setSeconds(value){
        if(value){
            this.seconds = value;
        }
        this.props.onChange(this.calculateTime())
    }

    calculateTime(){
        var time = ((this.minutes*60) + this.seconds)
        return time;
    }

    componentDidMount() {
        this.minutes = 0;
        this.seconds = 0;
    }

    render(){
        return(
            <h1>
                <div className="input">
                    <Input  placeholder={'00'}
                            min={0}
                            max={59}
                            onChange={this.setMinutes}
                    />:
                    <Input  placeholder={'00'}
                            min={0}
                            max={59}
                            onChange={this.setSeconds}
                    />
                </div>
            </h1>
        );
    }
}