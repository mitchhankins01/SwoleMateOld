import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class LogStore {
  @observable markedDate = {};
  @observable showCalendar = false;
  @observable selectedDate = new Date().toISOString().substr(0, 10);

  @action updateMarkedDate = date => {
    this.markedDate = date;
  }

  @action toggleCalendar = () => {
    this.showCalendar = !this.showCalendar;
  }

  @action updateSelectedDate = date => {
    this.selectedDate = date;
  }
}

const logStore = new LogStore();

export default logStore;
export { logStore };
