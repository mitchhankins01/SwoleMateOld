import React from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'mobx-react';
import { applyMiddleware, createStore } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import reducers from './src/reducers';

import Navigator from './src/config/routes';

import { themeStore, programStore } from './src/stores';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    EStyleSheet.build();
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider themeStore={themeStore} programStore={programStore}>
        <Navigator />
      </Provider>
    );
  }
}
