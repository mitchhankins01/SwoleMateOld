import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import BackgroundTimer from 'react-native-background-timer';

@inject('workoutStore') @observer
class Timer extends Component {
  componentWillMount() {
    this.props.workoutStore.clearTimer();
    
    this.timerID = BackgroundTimer.setInterval(() => {
      this.props.workoutStore.tickTimer();
    }, 1000);
  }

  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.timerID);
  }

  render() {
    return new Date(this.props.workoutStore.timePassed * 1000).toISOString().substr(12, 7);
  }
}

export default Timer;
