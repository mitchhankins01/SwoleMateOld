import firebase from 'react-native-firebase';

export const status = { complete: false };

export const toggleUpdate = (bool) => {
  status.complete = bool;
};

export const updateTheme = (theme) => {
  firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ theme })
    .then(() => toggleUpdate(true))
    .catch((error) => {
      this.error = error;
      this.showError = true;
    });
};

export const toggleImperial = (imperial) => {
  firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({ imperial: !imperial })
    .then(() => this.switchSuccess())
    .catch((error) => {
      this.error = error;
      this.showError = true;
    });
};
