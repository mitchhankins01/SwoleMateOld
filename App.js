import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';
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
};
