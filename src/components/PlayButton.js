import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class PlayButton extends Component {
    constructor(props) {
        super(props);
        this.state = {paused: true}
        this.startWatch = this.startWatch.bind(this)
    }

    startWatch(){
        if (this.state.paused && this.props.items.seconds > 0) {
            this.setState({paused: false})
        }
        else {
            this.setState({paused: true})
        }
        this.props.onClick(this.state.paused)
    }

    // method to reset paused value if user clicks reset while clock is not paused.
    // fixes bug where two clicks were required to start a new timer after reset.
    componentWillReceiveProps(nextProp) {
        if (nextProp.items.started === false && this.state.paused === false){
            this.setState({paused: true})
        }
    }

    render(){
        var icon;
        if (this.state.paused === true || this.props.items.started === false){
            icon = <Play className="icon"/>
        } else {
            icon = <Pause className="icon"/>
        }
        return (
            <MuiThemeProvider>
                <IconButton style={{ width: 120,
                                    height: 120,
                                    padding: 30}}
                                    onClick={this.startWatch}>
                    {icon}
                </IconButton>
            </MuiThemeProvider>
        );
    }
}