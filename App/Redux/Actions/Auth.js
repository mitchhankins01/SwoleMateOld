import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../Types/Auth';

export const test = test => test;

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });

  Actions.main();
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      Alert.alert('success');
      // loginUserSuccess(dispatch, user);
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error);
    });
};
