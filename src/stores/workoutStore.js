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
  @observable workoutLog = {};
  // Past log
  @observable fetchedLog;

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
    this.showCountDown = false;
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
      type: 'workout',
      timePassed: workoutLog.timePassed,
      author: firebase.auth().currentUser.uid,
      completed: new Date().toISOString().substr(0, 10),
    });

    workoutLog.completedExercises.forEach(each => {
      userLogsRef.collection('exercises').add({
        logKey: userLogsRef.id,
        exerciseKey: each.exerciseKey,
        completedSets: each.completedSets,
        completed: new Date().toISOString().substr(0, 10),
      });
    });
  }

  @action fetchExerciseLog = currentExercise => {
    const currentExerciseKey = currentExercise.exerciseKey;

    const logsRef = firebase.firestore()
    .collection('userLogs')
    .where('author', '==', firebase.auth().currentUser.uid);

    logsRef.get()
    .then(querySnapshot => {
      querySnapshot.forEach(log => {
        log.ref.collection('exercises').onSnapshot(snapShot => {
          snapShot.forEach(exerciseLogInfo => {
            const exerciseLog = exerciseLogInfo.data();
            if (exerciseLog.exerciseKey === currentExerciseKey) {
              if (!this.fetchedLog) {
                this.fetchedLog = exerciseLog;
                return;
              }
              if (new Date(this.fetchedLog.completed).getTime() < new Date(exerciseLog.completed).getTime()) {
                this.fetchedLog = exerciseLog;
              }
            }
          });
        });
      });
    });
  }
}

const workoutStore = new WorkoutStore();

export default workoutStore;
export { workoutStore };
