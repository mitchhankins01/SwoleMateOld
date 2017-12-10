import firebase from 'react-native-firebase';

// Various
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
export const UPDATE_SELECTED_DAY_KEY = 'UPDATE_SELECTED_DAY_KEY';

// Various
export const updateScreenIndex = index => {
  return {
    payload: index,
    type: UPDATE_SCREEN_INDEX,
  };
};

export const updateSelectedDayKey = key => {
  return {
    payload: key,
    type: UPDATE_SELECTED_DAY_KEY,
  };
};
