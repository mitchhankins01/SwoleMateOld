/* eslint react/prop-types: 0 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import * as A from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, ScrollView, BackHandler, Text, View, TouchableOpacity } from 'react-native';

import Alert from '../Components/Alert';
import Header from '../Components/Header';
import styles from './Styles/LogsStyles';
import Calendar from '../Components/Calendar';
import ActionButton from '../Components/ActionButton';
import LogCard from '../Components/LogCard';
// import * as Actions from '../Redux/Actions/Settings';

class Logs extends Component {
  state = { showCalendar: false };

  componentWillMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   if (this.state.onScreen !== 'Main') {
    //     this.setState({ onScreen: 'Main' });
    //     return true;
    //   }
    //   this.props.goBack();
    //   return true;
    // });
  }

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  getButtons() {
    const { toggleDrawer } = this.props;
    return [
      {
        icon: 'menu',
        animation: 'zoomIn',
        onPress: () => toggleDrawer(),
      },
      {
        icon: 'calendar',
        type: 'font-awesome',
        animation: 'zoomIn',
        onPress: () => this.setState( { showCalendar: !this.state.showCalendar } ),
      },
    ];
  }

  render() {
    const gradients = [ styles.$primary, styles.$secondary, styles.$tertiary ];
    return (
      <LinearGradient style={ styles.container } colors={ gradients }>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title={ this.state.showCalendar ? 'Select Date' : new Date().toDateString() } />
        <View style={ styles.subContainer }>
          {this.state.showCalendar ? <Calendar /> : <LogCard />}
        </View>
        <ActionButton buttons={ this.getButtons() } />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ( {
  auth: state.auth,
} );

const mapDispatchToProps = dispatch => ( {
  goBack: () => dispatch( NavigationActions.navigate( { routeName: 'Programs' } ) ),
  toggleDrawer: () => dispatch( NavigationActions.navigate( { routeName: 'DrawerToggle' } ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Logs );
