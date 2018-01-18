import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import createStore from '../Redux';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxNavigation />
      </Provider>
    );
  }
}
