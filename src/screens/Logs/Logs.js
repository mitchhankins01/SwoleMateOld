import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Logs extends Component {
  static navigationOptions = {
    tabBarLabel: 'Logs',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        size={26}
        style={{ color: tintColor }}
        name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
      />
    ),
  };

  render() {
    return null;
  }
}

export default Logs;
