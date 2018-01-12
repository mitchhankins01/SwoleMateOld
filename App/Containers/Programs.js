import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, StatusBar, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Fonts, Colors } from '../Themes';
import styles, { gradients, textColor } from './Styles/LoginStyles';

class Programs extends Component {
  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
    this.props.navigation.navigate('DrawerToggle');
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  authListener() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else this.props.navigation.navigate('LoginStack');
    });
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      </LinearGradient>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  //   startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(Programs);
