import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class WorkoutStore {
  @observable timePassed = 0;

  @action startTimer = () => {
    this.timePassedID = setInterval(() => {
      this.timePassed += 1;
    }, 1000);
  }

  @action clearTimer = () => {
    this.timePassed = 0;
    clearInterval(this.timePassedID);
  }
}

const workoutStore = new WorkoutStore();

export default workoutStore;
export { workoutStore };
