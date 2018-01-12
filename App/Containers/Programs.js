import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, StatusBar, Text } from 'react-native';

import { Fonts, Colors } from '../Themes';

class Programs extends Component {
  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  authListener() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else this.props.navigation.navigate('Login');
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  //   startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(Programs);
