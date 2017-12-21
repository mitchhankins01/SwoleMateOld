import React from 'react';
import { Provider } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './src/config/routes';
import { userStore, programStore, workoutStore, logStore } from './src/stores';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    EStyleSheet.build();
  }

  render() {
    return (
      <Provider
        logStore={logStore}
        userStore={userStore}
        workoutStore={workoutStore}
        programStore={programStore}
      >
        <Navigator />
      </Provider>
    );
  }
}
