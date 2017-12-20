import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class LogStore {
  // Logs
  @observable logs = [];
  @observable error = '';
  @observable loading = false;
  @observable showError = false;
  @observable screenIndex = 'logOverview';
  // Individual Logs
  @observable workoutLogs = [];
  @observable workoutLogsExercises = [];
  @observable bodyStatsLogs = [];
  @observable nutritionLogs = [];

  // Date
  @observable markedDate = {};
  @observable showCalendar = false;
  @observable selectedDate = new Date().toISOString().substr(0, 10);

  // Date
  @action toggleCalendar = () => {
    this.showCalendar = !this.showCalendar;
  }

  @action updateSelectedDate = date => {
    this.selectedDate = date;
  }
  // Logs
  @action fetchLogs = () => {
    const workout = { key: 'workout', color: 'green' };

    // Used to store exercises in, so it canbe appended to workoutLogs


    const logsRef = firebase.firestore()
    .collection('userLogs')
    .where('author', '==', firebase.auth().currentUser.uid);

    logsRef.onSnapshot(querySnapshot => {
      this.loading = true;
      this.logs.length = 0;
      this.markedDate = {};
      this.workoutLogsExercises.length = 0;
      querySnapshot.forEach(log => {
        const fetchedLog = log.data();

        if (fetchedLog.type === 'workout') {
          log.ref.collection('exercises').onSnapshot(snapShot => {
            snapShot.forEach(info => {
              if (fetchedLog.completed === this.selectedDate) {
                const meta = info.data();
                this.workoutLogsExercises.push({
                  ...meta, logKey: info.ref.parent.parent.id, completed: fetchedLog.completed
                });
              }
            });
          });
          this.markedDate = { ...this.markedDate, [fetchedLog.completed]: { dots: [workout] } };
        }

        this.logs.push(fetchedLog);
      });

      // Load into sep logs
      const workoutLogs = this.logs.filter(each => {
        return each.type === 'workout' && each.completed === this.selectedDate;
      });
      this.workoutLogs = workoutLogs;
      const bodyStatsLogs = this.logs.filter(each => {
        return each.type === 'bodyStats' && each.completed === this.selectedDate;
      });
      this.bodyStatsLogs = bodyStatsLogs;
      const nutritionLogs = this.logs.filter(each => {
        return each.type === 'nutrition' && each.completed === this.selectedDate;
      });
      this.nutritionLogs = nutritionLogs;

      this.loading = false;
    });
  }

  @action updateScreenIndex = index => {
    this.screenIndex = index;
  }

  @action isWorkout = type => {
    if (this.workoutLogs.length === 0) {
      if (type === 'bg') return 1;
      if (type === 'bttn') {
        this.error = 'No workout was found! Unlike your gainz';
        this.showError = true;
      }
      return '#BCC3C7';
    }
    if (type === 'bg') return 0.2;
    if (type === 'bttn') return this.updateScreenIndex('workout');
    return '#EDF0F1';
  };

  @action isBodyStats = type => {
    if (this.bodyStatsLogs.length === 0) {
      if (type === 'bg') return 1;
      if (type === 'bttn') {
        this.error = 'No Body Stats were found!';
        this.showError = true;
      }
      return '#BCC3C7';
    }
    if (type === 'bg') return 0.2;
    if (type === 'bttn') return this.updateScreenIndex('bodyStats');
    return '#EDF0F1';
  };

  @action isNutrition = type => {
    if (this.nutritionLogs.length === 0) {
      if (type === 'bg') return 1;
      if (type === 'bttn') {
        this.error = 'No Nutrion logs were found!';
        this.showError = true;
      }
      return '#BCC3C7';
    }
    if (type === 'bg') return 0.2;
    if (type === 'bttn') return this.updateScreenIndex('nutrition');
    return '#EDF0F1';
  };

  @action toggleError = bool => {
    this.showError = bool;
    if (!bool) this.error = '';
  }

}

const logStore = new LogStore();

export default logStore;
export { logStore };
