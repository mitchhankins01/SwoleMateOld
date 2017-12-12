import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class ProgramStore {

  // Various
  @observable loading: false;
  @observable selectedDayKey: '';
  @observable screenIndex = 'primaryProgram';
  // Get program info
  @observable info = [];
  @observable days = [];
  @observable exercises = [];

  @action updateScreenIndex = index => {
    this.screenIndex = index;
  }

  @action updateselectedDayKey = key => {
    this.selectedDayKey = key;
  }

  @action fetchPrimaryProgram = () => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.fetchProgram(userDoc.data().primaryProgram);
    });
  }

  @action fetchProgram = (primary, selected) => {
    const program = selected || primary;
    const programRef = firebase.firestore()
    .collection('userPrograms').doc(program);

    programRef.onSnapshot(thisProgram => {
      this.loading = true;
      this.info.length = 0;
      const {
        author, frequency, description, level, name, type
      } = thisProgram.data();
      this.info.push({
        author, frequency, description, level, name, type, key: thisProgram.id
      });
      this.loading = false;
    });

    programRef.collection('days').onSnapshot(querySnapshot => {
      this.loading = true;
      this.days.length = 0;
      querySnapshot.forEach(day => {
        const { author, description, key, name, primaryGroup, secondaryGroup } = day.data();
        this.days.push({ author, description, key, name, primaryGroup, secondaryGroup });
      });
      this.loading = false;
    });

    programRef.collection('exercises').onSnapshot(querySnapshot => {
      this.loading = true;
      this.exercises.length = 0;
      querySnapshot.forEach(exercise => {
        const { author, day, exerciseKey, key, reps, rest, sets } = exercise.data();
        this.exercises.push({ author, day, exerciseKey, key, reps, rest, sets });
      });
      this.loading = false;
    });
  }

  @action setProgram = (program) => {
    this.program = program;
  }
}

const programStore = new ProgramStore();

export default programStore;
export { programStore };
