import './App.css';
import React from "react";
import $ from "jquery";
import TimerLengthControl from './timerLengthControl';
import beepSound from './beepSound.wav';

class App extends React.Component {
  state = {
    timerType: 'Session',
    breakLength: 5,  // default val: 5
    sessionLength: 25,  // default val: 25
    timeRemains: 25 * 60, // default val: 25 * 60
    loop: undefined,
    isRunning: false,
    beepAudio: new Audio(beepSound)
  }
  
  convertToTime = (count) => {
    {/* A method that a count of time remains and returns a string with the time remains*/}
    const minutes = Math.floor( count / 60) ;
    let seconds = Math.floor( count % 60 );
    if ( seconds < 10 ) {
      seconds = '0'+ seconds;
    }
      if ( minutes < 10 ){
        return `0${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }
  
  playPause = () => {
    const { 
      timerType,
      timeRemains, 
      loop, 
      isRunning 
    } = this.state;

    let beepSoundAudio = new Audio(beepSound);
    
    if (isRunning) {
      clearInterval(this.state.loop);
      this.setState({
        isRunning: false
      });
      
    } else {
      
      
      this.setState({
        isRunning: true,
        loop: setInterval(() => {
          const { timeRemains, breakLength, sessionLength, timerType, beepAudio } = this.state;
          
          (timeRemains <= 60) ? ($('#time-left').css({color:'red'})) : ($('#time-left').css({color: 'white'}));
          
          if ( timeRemains === 0){
            beepSoundAudio.play(); 
            this.setState({
              timerType: (timerType === 'Session') ? 'Break' : 'Session',
              timeRemains: (timerType === 'Session') ? (breakLength * 60) : (sessionLength * 60)
            });
      } else {
        this.setState({
            timeRemains: timeRemains - 1
          });
      }            
        }, 1000)
    });
   } 
  }
  
  reset = () => {
    const { sessionLength, timeRemains, beepAudio } = this.state;
    beepAudio.pause();
    beepAudio.currentTime = 0;
    $('#time-left').css({color: 'white'});
    this.setState({
      timerType: 'Session',
      breakLength: 5,
      sessionLength: 25,
      timeRemains: 25 * 60,
      isRunning: false
    });
    clearInterval(this.state.loop);
  }
  
  handleBreakDecrement = () => {
    const { breakLength } = this.state;
    if (1 < breakLength){
      this.setState({
      breakLength: breakLength - 1
    });
    }
  }
  
  handleBreakIncrement = () => {
    const { breakLength } = this.state;
    if (breakLength < 60){
      this.setState({
      breakLength: breakLength + 1
    });
    }
  }
  
  handleSessionDecrement = () => {
    const { sessionLength } = this.state;
    if (1 < sessionLength){
      this.setState({
      sessionLength: sessionLength - 1,
        timeRemains: (sessionLength - 1) * 60
    });
    }
  }
  
  handleSessionIncrement = () => {
    const { sessionLength } = this.state;
    if (sessionLength < 60){
      this.setState({
      sessionLength: sessionLength + 1,
        timeRemains: (sessionLength + 1) * 60
    });
    }
  }
  
  render (){
    
    {/* Break component */}
    const breakControl = {
      type: "break",
      title: "Break Length",
      time: this.state.breakLength,
      handleDecrement: this.handleBreakDecrement,
      handleIncrement: this.handleBreakIncrement
    }
    
    {/* Session component */}
    const sessionControl = {
      type: "session",
      title: "Session Length",
      time: this.state.sessionLength,
      handleDecrement: this.handleSessionDecrement,
      handleIncrement: this.handleSessionIncrement
    }

    
    return (
      
      <div id="container"> 
        
      <h1> Pomodoro Clock </h1>
      <div className="flex">
        {/* control panel */}
        <TimerLengthControl {...breakControl} />
        <TimerLengthControl {...sessionControl} />
        </div>
    
        {/* timer display */}
      <div id="timer-wrap">
        <h2 id="timer-label"> {this.state.timerType} </h2>
        <div id="time-left"> {this.convertToTime(this.state.timeRemains)} </div>
        </div>
      <button id="start_stop" onClick={this.playPause}>
        <i className="fas fa-play" />
            <i className="fas fa-pause" />
      </button>
      <button id="reset" onClick={this.reset}>
        <i className="fas fa-sync" />
        </button>
        
    </div>   
  );
  }
}



export default App;
