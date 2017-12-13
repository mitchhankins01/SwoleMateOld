import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';
import BackgroundTimer from 'react-native-background-timer';

class WorkoutStore {
  // Overall time passed in workout
  @observable timePassed = 0;
  // Current exercise rest
  @observable countDown = 60;
  @observable showCountDown = false;

  // timePassed
  @action startTimer = () => {
    this.timePassedID = setInterval(() => {
      this.timePassed += 1;
    }, 1000);
  }

  @action clearTimer = () => {
    this.timePassed = 0;
    clearInterval(this.timePassedID);
  }

  // countDown
  @action setCountDown = seconds => {
    this.countDown = seconds;
  }

  @action toggleShowCountDown = bool => {
    this.showCountDown = bool;
  }

  @action startCountDown = bool => {
    if (bool) this.showCountDown = true;
    this.countDownID = BackgroundTimer.setInterval(() => {
      if (this.countDown <= 0) {
        BackgroundTimer.clearInterval(this.countDownID);
        this.showCountDown = false;
      } else {
        this.countDown -= 1;
      }
    }, 1000);
  }

  @action clearCountDown = () => {
    this.countDown = 60;
    BackgroundTimer.clearInterval(this.countDownID);
  }
}

const workoutStore = new WorkoutStore();

export default workoutStore;
export { workoutStore };
