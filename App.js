import React from 'react';
import { Provider } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './src/config/routes';
import { themeStore, programStore, workoutStore } from './src/stores';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    EStyleSheet.build();
  }

  render() {
    return (
      <Provider themeStore={themeStore} programStore={programStore} workoutStore={workoutStore}>
        <Navigator />
      </Provider>
    );
  }
}
