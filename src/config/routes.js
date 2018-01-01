import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Main from '../screens/Main';
import Home from '../screens/Home';
import Login from '../screens/Login';
import { Logs } from '../screens/Logs';
import Drawer from '../components/Drawer';
import Register from '../screens/Register';
import { Workout } from '../screens/Workout';
import { Settings } from '../screens/Settings';

const MainStack = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  Workout: {
    screen: Workout,
  },
  HomeStack: {
    screen: DrawerNavigator({
      Home: { screen: Home },
      Logs: { screen: Logs },
      Settings: { screen: Settings },
    }, {
    contentComponent: Drawer,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
    },
    })
  },
}, {
  headerMode: 'none',
});

class Navigator extends Component {
  render() {
    return (
      <MainStack />
    );
  }
}

export default Navigator;
