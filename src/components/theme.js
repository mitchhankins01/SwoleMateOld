import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';

export const handleThemeSelection = (themes, i, theme, goBack) => {
  if (i === themes.length - 1) {
    goBack();
  } else {
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).update({ theme });
  }
};

export const standard = {
  $primaryColor: '#70B2F9',
  $secondaryColor: '#4872A0',
  $tertiaryColor: '#38597C',
};

export const standard2 = {
  $primaryColor: '#CD83F8',
  $secondaryColor: '#925EB1',
  $tertiaryColor: '#67427B',
};

export const standard3 = {
  $primaryColor: '#F8CB4B',
  $secondaryColor: '#B09134',
  $tertiaryColor: '#7B6623',
};

export default {
  createStyleSheet
};

function createStyleSheet(srcStyles) {
  return {
    standard: EStyleSheet.create(Object.assign({}, standard, srcStyles)),
    standard2: EStyleSheet.create(Object.assign({}, standard2, srcStyles)),
    standard3: EStyleSheet.create(Object.assign({}, standard3, srcStyles)),
  };
}
