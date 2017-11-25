import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './src/config/routes';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    EStyleSheet.build();
  }

  render() {
    return (
      <Navigator />
    );
  }
}
