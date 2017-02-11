import React, { Component } from 'react';
import './App.css';
import InputNumber from './components/InputNumber';
import PlayButton from './components/PlayButton';
import ResetButton from './components/ResetButton';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Uses file-loader to create new public url for mp3's
var url = require("./static/timer-lyd.mp3");
var audio = new Audio(url);

var max = 10000; // Keeps track of the set time, so that CircularProgress can be dynamic with the timer.
var color = "white"; // Hides CircularProgress when it is not used.

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 0, started: false, paused: true};
        this.startWatch = this.startWatch.bind(this)
        this.timeoutSound = this.timeoutSound.bind(this)
        this.reset = this.reset.bind(this)
        this.setTime = this.setTime.bind(this)
    }

    displaySeconds(){
        return (`0${this.state.seconds % 60}`).slice(-2)
    }

    displayMinutes(){
        return (`0${Math.floor(this.state.seconds / 60)}`).slice(-2)
    }

    timeoutSound(){
        audio.loop = true;
        audio.play();
    }

    startWatch(e){
        if (e){
            if (!this.state.started){
                max = (this.state.seconds);
            }
            if(this.state.seconds !== 0){
                this.setState({started: true});
                color = "#00BCD4"
                this.counter = setInterval(() => {
                    if(this.state.seconds === 0) {
                        clearInterval(this.counter)
                        this.timeoutSound()
                        return;
                    }
                    this.setState({seconds: (this.state.seconds - 1)})
                }, 1000);
            }
        } else {
            clearInterval(this.counter);
            audio.pause();
            audio.currentTime = 0;
        }
    }

    reset(){
        if (this.state.started){
            clearInterval(this.counter);
            this.setState({started: false, seconds: 0});
            max = 10000;
            color = "white";
            audio.pause();
            audio.currentTime = 0;
        }
    }

    setTime(e){
        this.setState({seconds: e});
    }

    render() {
        var partial; // Used to swap between input and timer-display
        if (this.state.started)  {
            partial = <h1>{this.displayMinutes()}:{this.displaySeconds()}</h1>;
        } else {
            partial = <InputNumber onChange={this.setTime}/>              
        }

        return (
            <div className="App">
                {partial}
                <div className="Ring">
                    <MuiThemeProvider>
                        <CircularProgress
                            mode="determinate"
                            size={250}
                            max={max}
                            color={color}
                            value={this.state.seconds}
                        />
                    </MuiThemeProvider>  
                </div>
                <PlayButton items={{seconds: this.state.seconds, started: this.state.started}} onClick={this.startWatch}/>
                <ResetButton onClick={this.reset}/>
            </div>
        );
    }
}