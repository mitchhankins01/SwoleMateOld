import firebase from 'react-native-firebase';
import { RESET_AUTH, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../Types/Auth';

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET_AUTH });
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error,
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch, error.message));
};
