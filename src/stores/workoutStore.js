import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';
import BackgroundTimer from 'react-native-background-timer';

class WorkoutStore {
  // Overall time passed in workout
  @observable timePassed = 0;
  // Current exercise rest
  @observable countDown = 60;
  @observable showCountDown = false;
  // Finished workout log
  @observable workoutLog = {}; // Workout log must be cleared after submitting

  // timePassed
  @action startTimer = () => {
    this.timePassedID = setInterval(() => {
      this.timePassed += 1;
    }, 1000);
  }

  @action stopTimer = () => {
    clearInterval(this.timePassedID);
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
    if (!bool) this.clearCountDown();
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

  // Workout log
  @action setWorkoutLog = workoutLog => {
    this.workoutLog = workoutLog;
  }

  @action clearWorkoutLog = () => {
    this.workoutLog = {};
  }

  @action addWorkoutLog = workoutLog => {
    const userLogsRef = firebase.firestore().collection('userLogs').doc();

    userLogsRef.set({
      timePassed: workoutLog.timePassed,
      author: firebase.auth().currentUser.uid,
      completed: new Date(),
    });

    workoutLog.completedExercises.forEach(each => {
      userLogsRef.collection('exercises').add(each);
    });

    // firebase.firestore().collection('userLogs').add({
    //   timePassed: workoutLog.timePassed,
    //   author: firebase.auth().currentUser.uid,
    //   exercises: workoutLog.completedExercises.map(each => each),
    // }) // Implement error
    // .catch(error => {
    //   this.error = error.message;
    // });
  }
}

const workoutStore = new WorkoutStore();

export default workoutStore;
export { workoutStore };
