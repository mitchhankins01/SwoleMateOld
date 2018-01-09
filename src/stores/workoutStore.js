import firebase from 'react-native-firebase';
import { action, observable, toJS } from 'mobx';
import BackgroundTimer from 'react-native-background-timer';

class WorkoutStore {
  // Current workout
  @observable reps = 10;
  @observable weight = 10;
  @observable exerciseIndex = 0;
  @observable exerciseList = [];
  @observable exerciseName = '';
  @observable exerciseRest = 60;
  @observable allExercises = [];
  @observable currentExercise = [];
  @observable exerciseSetIndex = 1;
  @observable nextExerciseName = '';
  @observable workoutComplete = false;
  @observable showLastSetInfo = false;
  @observable exerciseLog = {
    exerciseKey: '',
    completedSets: [],
  };
  @observable workoutLog = {
    timePassed: 0,
    completedExercises: [],
  };
  // Overall time passed in workout
  @observable timePassed = 0;
  // Current exercise rest
  @observable countDown = 60;
  @observable showCountDown = false;
  // Past log
  @observable fetchedLog = [];
  @observable fetchedLogAll = [];
  @observable showPastLogs = false;
  // Alert
  @observable showAlert = false;
  // Exercise List
  @observable showExerciseList = false;

  @action logList = () => {
    return console.log(toJS(this.exerciseList));
  }

  // Current workout
  @action initWorkout = (exercises, selectedDayKey, allExercises) => {
    this.allExercises = allExercises;

    const filteredExerciseList = exercises.filter(each => {
      return each.day === selectedDayKey;
    });
    this.exerciseList = filteredExerciseList;

    // this.startTimer();
    this.loadExercise();
  }

  @action terminateWorkout = () => {
    this.clearTimer();
    this.clearCountDown();
    // Reset
    this.reps = 10;
    this.weight = 10;
    this.timePassed = 0;
    this.countDown = 60;
    this.fetchedLog = [];
    this.exerciseIndex = 0;
    this.exerciseList = [];
    this.exerciseRest = 60;
    this.allExercises = [];
    this.exerciseName = '';
    this.showAlert = false;
    this.fetchedLogAll = [];
    this.showPastLogs = false;
    this.currentExercise = [];
    this.exerciseSetIndex = 1;
    this.nextExerciseName = '';
    this.showCountDown = false;
    this.showLastSetInfo = false;
    this.workoutComplete = false;
    this.showExerciseList = false;
    this.exerciseLog = {
      exerciseKey: '',
      completedSets: [],
    };
    this.workoutLog = {
      timePassed: 0,
      completedExercises: [],
    };
  }

  @action toggleAlert = bool => {
    this.showAlert = bool;
  }

  @action toggleShowPastLogs = bool => {
    this.showPastLogs = bool;
  }

  @action toggleWorkoutComplete = bool => {
    this.workoutComplete = bool;

    if (bool) {
      this.stopTimer();
      this.setWorkoutLog(toJS(this.workoutLog));
      this.syncWorkoutLog(toJS(this.workoutLog));
    }
  }

  @action toggleLastSetInfo = bool => {
    this.showLastSetInfo = bool;
  }

  @action toggleExerciseList = bool => {
    this.showExerciseList = bool;
  }

  @action setWeight = weight => {
    this.weight = weight;
  }

  @action setReps = reps => {
    this.reps = reps;
  }

  @action loadExercise = () => {
    if (this.exerciseIndex >= this.exerciseList.length) {
      return this.toggleWorkoutComplete(true);
    }
    // if on the first exercise, fetch log now, otherwise fetch later
    if (this.exerciseIndex === 0) {
      this.fetchExerciseLog(this.exerciseList[0], () => this.loadLastWeight(0));
    } else {
      this.fetchExerciseLog(this.exerciseList[this.exerciseIndex]);
    }

    // Set target reps
    this.reps = this.exerciseList[this.exerciseIndex].reps;

    // Get exercise key to append it to the exerciseLog
    const exerciseKey = this.exerciseList[this.exerciseIndex].exerciseKey;
    // Pull meta info off all exercises when compared to the current exercise,
    // to get exercise name
    const currentExerciseMeta = this.allExercises.find(query => {
      return query.key === this.exerciseList[this.exerciseIndex].exerciseKey;
    });

    // Update current workout state
    this.exerciseName = currentExerciseMeta.name;
    this.exerciseLog = { ...this.exerciseLog, exerciseKey };
    this.currentExercise = this.exerciseList[this.exerciseIndex];
    // IMPLEMENT, can rest be pulled of curr ex to reduce code?
    this.exerciseRest = this.exerciseList[this.exerciseIndex].rest;
  }

  @action getNextExerciseName() {
    if (this.exerciseIndex + 1 === this.exerciseList.length) {
      this.nextExerciseName = { name: 'End of Workout ' };
    } else {
      this.nextExerciseName = this.allExercises.find(query => {
        return query.key === this.exerciseList[this.exerciseIndex + 1].exerciseKey;
      });
    }
  }

  @action onPressSave = () => {
    const { sets } = this.currentExercise;
    const { completedSets } = this.exerciseLog;

    if (!this.reps) this.reps = 0;
    if (!this.weight) this.weight = 0;

    if (completedSets.length === sets - 1) {
      this.saveSet();
      this.saveExercise();
    } else if (completedSets.length === sets - 2 || sets === 1) {
      this.saveSet();
      this.getNextExerciseName();
      this.toggleLastSetInfo(true);
    } else {
      this.saveSet();
    }
  }

  @action saveSet = () => {
    // Set and start countDown
    this.setCountDown(this.currentExercise.rest);
    this.startCountDown(true);

    // Save set in array
    this.exerciseLog.completedSets.push({
      reps: this.reps,
      weight: this.weight,
      set: this.exerciseSetIndex,
    });

    // Prep for next set
    this.exerciseSetIndex += 1;

    this.exerciseLog = {
      completedSets: this.exerciseLog.completedSets,
      exerciseKey: this.exerciseLog.exerciseKey,
    };

    this.loadLastWeight(this.exerciseSetIndex - 1);
  }

  @action saveExercise = () => {
    // Save current exerciselog in the workoutLog
    this.workoutLog.timePassed = this.timePassed;
    this.workoutLog.completedExercises.push(this.exerciseLog);

    // Prep for next exercise
    this.exerciseIndex += 1;
    this.exerciseSetIndex = 1;
    this.exerciseLog = {
      exerciseKey: '',
      completedSets: [],
    };

    // Load next exercise
    this.loadExercise();
  }

  @action loadLastWeight = index => {
    const fetched = toJS(this.fetchedLog);

    if (fetched.length === 0) {
      this.weight = 10;
    } else {
      if (this.exerciseSetIndex >= fetched.completedSets.length) return;
      this.weight = fetched.completedSets[index].weight;
    }
  }

  // timePassed
  @action tickTimer = () => {
    this.timePassed += 1;
  }

  @action clearTimer = () => {
    this.timePassed = 0;
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

  @action syncWorkoutLog = workoutLog => {
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

  @action fetchExerciseLog = (currentExercise, cb) => {
    if (!currentExercise) return;

    const currentExerciseKey = currentExercise.exerciseKey;

    const logsRef = firebase.firestore()
    .collection('userLogs')
    .orderBy('completed', 'desc')
    .where('author', '==', firebase.auth().currentUser.uid);

    logsRef.get()
    .then(querySnapshot => {
      this.fetchedLog = [];
      querySnapshot.forEach(log => {
        log.ref.collection('exercises').onSnapshot(snapShot => {
          snapShot.forEach(exerciseLogInfo => {
            const exerciseLog = exerciseLogInfo.data();
            if (exerciseLog.exerciseKey === currentExerciseKey) {
              this.fetchedLogAll.push(exerciseLog);
              if (this.fetchedLog.length === 0) {
                this.fetchedLog = exerciseLog;
                if (cb) cb();
                return;
              }
              if (new Date(this.fetchedLog.completed).getTime() < new Date(exerciseLog.completed).getTime()) {
                this.fetchedLog = exerciseLog;
                if (cb) cb();
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
