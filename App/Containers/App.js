import createStore from '../Redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { BackHandler, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReduxNavigation from '../Navigation/ReduxNavigation';

const store = createStore();

export default class App extends Component {
  constructor() {
    super();
    EStyleSheet.build({
      $text: '#EDF0F1',
      $theme: 'standard',
      $primaryColor: '#70B2F9',
      $tertiaryColor: '#38597C',
      $secondaryColor: '#4872A0',
      $bgColor: 'rgba(0, 0, 0, 0.1)',
    });
  }

  componentWillMount() {
    // console.log(this.props);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // if (this.props.)
      console.log(this.props);
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxNavigation />
      </Provider>
    );
  }
}
