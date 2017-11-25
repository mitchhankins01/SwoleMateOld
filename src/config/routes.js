import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Main from '../screens/Main';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Form from '../screens/Form';
import TabBar from '../components/TabBar';

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
  Form: {
    screen: Form,
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
