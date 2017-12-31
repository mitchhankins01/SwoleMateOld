import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';
import Header from '../../components/Header';
import { Card } from '../../components/Card';
import { Calendar } from '../../components/Calendar';

@inject('userStore', 'logStore') @observer
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

  componentDidUpdate() {
    if (this.refs.mainView && !this.props.logStore.error) {
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

  renderError() {
    const { error, showError } = this.props.logStore;

    if (showError) {
     this.dropdown.alertWithType('error', 'Whoops', error || 'Something went wrong!');
    }
  }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const { showCalendar, toggleCalendar } = this.props.logStore;
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
        {this.renderError()}
        <DropdownAlert
          translucent
          closeInterval={2000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
          onClose={() => this.props.logStore.toggleError(false)}
        />
      </LinearGradient>
    );
  }
}

export default Logs;
