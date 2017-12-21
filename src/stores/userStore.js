import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class UserStore {

  @observable error = '';
  @observable imperial = true;
  @observable selected = 'standard';

  // Theme
  @action fetchTheme = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.selected = userDoc.data().theme;
      this.imperial = userDoc.data().imperial;
    }, error => {
      this.error = error.message;
    });
  }

  @action updateTheme = theme => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ theme });
  }

  @action toggleImperial = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ imperial: !this.imperial });
  }
}

const userStore = new UserStore();

export default userStore;
export { userStore };
