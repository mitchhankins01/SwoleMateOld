import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';
import Header from '../../components/Header';
import { Card } from '../../components/Card';
import { Alert } from '../../components/Alert';
import { Calendar } from '../../components/Calendar';

@inject('userStore', 'logStore') @observer
class Logs extends Component {
  static navigationOptions = {
    drawerLabel: 'Logs',
    drawerIcon: ({ tintColor, focused }) => (
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
    const styles = themeStyles[this.props.userStore.selected];
    const { showCalendar, toggleCalendar, toggleError, showError, error } = this.props.logStore;
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
        <Header title={'Logs'} styles={styles} navigation={this.props.navigation} />
        <Animatable.View style={{ flex: 1 }} ref='mainView'>
          {this.renderContent(styles)}
        </Animatable.View>
        <Button
          raised
          onPress={() => {
            toggleCalendar();
            this.refs.mainView.awesomeIn(500);
          }}
          buttonStyle={styles.calendarButton}
          textStyle={styles.calendarButtonText}
          containerViewStyle={styles.calendarButtonContainer}
          title={showCalendar ? 'Back to Logs' : 'Change Date'}
          icon={showCalendar
            ? { name: 'back', type: 'entypo', size: 20 }
            : { name: 'calendar', type: 'entypo', size: 18 }
          }
        />
        {showError ?
          <Alert
            acknowledge
            title='Whoops'
            message={error}
            onPressSave={() => toggleError(false)}
          />
          : null}
      </LinearGradient>
    );
  }
}

export default Logs;
