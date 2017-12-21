import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class UserStore {

  @observable name = '';
  @observable error = '';
  @observable imperial = true;
  @observable showError = false;
  @observable showSuccess = false;
  @observable selected = 'standard';

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
    .update({ theme });
  }

  @action toggleImperial = () => {
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ imperial: !this.imperial });
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

  @action toggleError = bool => {
    this.error = '';
    this.showError = bool;
  }

  @action switchSuccess = () => {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }
}

const userStore = new UserStore();

export default userStore;
export { userStore };
