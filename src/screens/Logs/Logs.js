import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';
import Header from '../../components/Header';
import { Card } from '../../components/Card';
import { Calendar } from '../../components/Calendar';

@inject('themeStore', 'logStore') @observer
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

  componentWillMount() {
    this.props.logStore.fetchLogs();
  }

  componentWillUpdate() {
    if (this.refs.mainView) {
      this.refs.mainView.awesomeIn(500);
    }
  }

  renderContent() {
    const { screenIndex, showCalendar } = this.props.logStore;
    switch (screenIndex) {
      default: return;
      case 'logOverview': return showCalendar ? <Calendar /> : <Card logCard />;
      case 'workout': return showCalendar ? <Calendar /> : <Card logCard workout />;
      case 'bodyStats': return null;
      case 'nutrition': return null;
    }
  }

  render() {
    const { selectedDate, showCalendar, toggleCalendar } = this.props.logStore;
    const styles = themeStyles[this.props.themeStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Header title={'Logs'} styles={styles} />
        <Animatable.View style={{ flex: 1 }} ref='mainView'>
          {this.renderContent(styles)}
        </Animatable.View>
        <Button
          raised
          onPress={() => toggleCalendar()}
          buttonStyle={styles.calendarButton}
          textStyle={styles.calendarButtonText}
          containerViewStyle={styles.calendarButtonContainer}
          title={showCalendar ? 'Back to Logs' : 'Change Date'}
          icon={showCalendar
            ? { name: 'back', type: 'entypo', size: 20 }
            : { name: 'calendar', type: 'entypo', size: 18 }
          }
        />
      </LinearGradient>
    );
  }
}

export default Logs;
