import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class ThemeStore {

  @observable error = '';
  @observable selected = 'standard';

  @action fetchTheme = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.selected = userDoc.data().theme;
    }, error => {
      this.error = error.message;
    });
  }
}

const themeStore = new ThemeStore();

export default themeStore;
export { themeStore };
