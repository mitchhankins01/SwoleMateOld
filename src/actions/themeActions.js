import firebase from 'react-native-firebase';

// Fetch Theme
export const FETCH_THEME = 'FETCH_THEME';
export const FETCH_THEME_FAILURE = 'FETCH_THEME_FAILURE';
export const FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS';

// Change Theme
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_THEME_FAILURE = 'CHANGE_THEME_FAILURE';
export const CHANGE_THEME_SUCCESS = 'CHANGE_THEME_SUCCESS';

// Fetch Theme
export const fetchTheme = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_THEME });

    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid)
    .get()
    .then(userDoc => {
      fetchThemeSuccess(dispatch, userDoc.data().theme);
    })
    .catch(error => {
      fetchThemeFailure(dispatch, error);
    });
  };
};

const fetchThemeFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_THEME_FAILURE,
  });
};

const fetchThemeSuccess = (dispatch, selected) => {
  dispatch({
    payload: selected,
    type: FETCH_THEME_SUCCESS,
  });
};

// Change Theme
export const changeTheme = (themes, i, theme, goBack) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_THEME });

    if (i === themes.length - 1) {
      goBack();
    } else {
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').doc(uid).update({ theme })
      .then(() => {
        changeThemeSuccess(dispatch, theme);
      })
      .catch(error => {
        changeThemeFailure(dispatch, error);
      });
    }
  };
};

const changeThemeFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: CHANGE_THEME_FAILURE,
  });
};

const changeThemeSuccess = (dispatch, selected) => {
  dispatch({
    payload: selected,
    type: CHANGE_THEME_SUCCESS,
  });
};
