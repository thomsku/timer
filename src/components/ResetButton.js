import React, { Component } from 'react';
import Replay from 'material-ui/svg-icons/av/replay';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ResetButton extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this)
    }

    reset(){
        this.props.onClick()
    }

    render(){
        return (
            <MuiThemeProvider>
                <IconButton onClick={this.reset}>
                    <Replay className="icon">Reset</Replay>
                </IconButton>
            </MuiThemeProvider>
        );
    }
}