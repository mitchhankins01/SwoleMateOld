import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class UserStore {

  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  authListener() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = {};
      }
    });
  }

  @observable user = '';
  @observable name = '';
  @observable error = '';
  @observable imperial = true;
  @observable showError = false;
  @observable showSuccess = false;
  @observable selected = 'standard';
  @observable screenIndex = 'Main';

  // For Settings
  @action updateScreenIndex = index => {
    this.screenIndex = index;
  }

  @action getScreenIndex = () => {
    return this.screenIndex;
  }

  // Theme
  @action fetchTheme = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.name = userDoc.data().name;
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
    .update({ theme })
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action toggleImperial = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ imperial: !this.imperial })
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action updateName = name => {
    if (name.length === 0) {
      this.showError = true;
      this.error = 'Invalid Name';
      return;
    }

    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ name })
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action updateEmail = email => {
    if (email.length === 0) {
      this.showError = true;
      this.error = 'Invalid Email';
      return;
    }

    firebase.auth().currentUser.updateEmail(email)
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action updatePassword = email => {
    if (email.length === 0) {
      this.showError = true;
      this.error = 'Invalid Email';
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action deleteUser = () => {
    firebase.auth().currentUser.delete()
    .then(() => this.switchSuccess())
    .catch(error => {
      this.error = error;
      this.showError = true;
    });
  }

  @action toggleError = bool => {
    this.error = '';
    this.showError = bool;
  }

  @action switchSuccess = () => {
    this.screenIndex = 'Main';
    this.showSuccess = true;
  }

  @action toggleShowSuccess = bool => {
    this.showSuccess = bool;
  }
}

const userStore = new UserStore();

export default userStore;
export { userStore };
