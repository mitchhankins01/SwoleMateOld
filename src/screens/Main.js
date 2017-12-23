import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import themeStyles from '../components/styles';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  authListener() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) { // HomeStack
        this.resetNavigation('HomeStack');
      } else {
        this.resetNavigation('Login');
      }
    });
  }

  resetNavigation = (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const styles = themeStyles.standard;
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient
        colors={gradients}
        style={styles.container}
      >
        <Text style={styles.appName}>SwoleMate</Text>
        <Text style={styles.header}>Welcome</Text>
      </LinearGradient>
    );
  }
}

export default Main;
