import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Main from '../screens/Main';
import Home from '../screens/Home';
import Login from '../screens/Login';
import TabBar from '../components/TabBar';
import Register from '../screens/Register';
import Settings from '../screens/Settings';
import { Workout } from '../screens/Workout';

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
    screen: TabNavigator({
      Home: { screen: Home },
      Settings: { screen: Settings },
    }, {
      tabBarComponent: TabBar,
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
