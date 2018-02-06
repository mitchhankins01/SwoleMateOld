/* eslint react/prop-types: 0 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import { StatusBar, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import { ThemeSelector } from '../Themes/';
import styles from './Styles/SettingsStyles';
import ActionButton from '../Components/ActionButton';
import { SettingsCard } from '../Components/SettingsCard';
// import * as Actions from '../Redux/Actions/Settings';

class Settings extends Component {
  state = {
    onScreen: 'Main',
    name: this.props.auth.name,
    email: firebase.auth().currentUser.email,
    password: firebase.auth().currentUser.email,
  };

  getContent() {
    switch (this.state.onScreen) {
      default:
        return { title: 'Error', options: [{ title: 'Error' }] };
      case 'Main':
        return {
          title: 'Main',
          options: [
            {
              title: 'Profile',
              icon: 'user',
              onPress: () => this.setState({ onScreen: 'Profile' }),
            },
            {
              title: 'General',
              icon: 'list',
              onPress: () => this.setState({ onScreen: 'General' }),
            },
            {
              title: 'Theme',
              icon: 'palette',
              onPress: () => this.setState({ onScreen: 'Theme' }),
            },
            {
              title: 'Logout',
              icon: 'power-plug',
              onPress: () => firebase.auth().signOut(),
            },
          ],
        };
      case 'Profile':
        return {
          title: 'Profile',
          options: [
            {
              title: 'Name',
              icon: 'message',
              onPress: () => {
                // toggleShowInput(true);
                // setUpdateValue('name');
              },
            },
            {
              title: 'Email',
              icon: 'email',
              onPress: () => {
                // toggleShowInput(true);
                // setUpdateValue('email');
              },
            },
            {
              title: 'Password',
              icon: 'lock',
              onPress: () => {
                // toggleShowInput(true);
                // setUpdateValue('password');
              },
            },
            {
              title: 'Delete Account',
              icon: 'trash',
              onPress: () => {
                // toggleShowInput(true);
                // setUpdateValue('delete');
              },
            },
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.setState({ onScreen: 'Main' }),
            },
          ],
        };
      case 'General':
        return {
          title: 'General',
          options: [
            // {
            //   title: imperial ? 'Use Metric System (Kg)' : 'Use Imperial System (Lb)',
            //   icon: 'suitcase',
            //   onPress: () => toggleImperial(),
            // },
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.setState({ onScreen: 'Main' }),
            },
          ],
        };
      case 'Theme':
        return {
          title: 'Theme',
          options: [
            {
              title: 'Male',
              icon: 'palette',
              name: 'standard',
              onPress: () => {}, // updateTheme('standard'),
            },
            {
              title: 'Female',
              icon: 'palette',
              name: 'standard2',
              onPress: () => {},
            },
            {
              title: 'Other',
              icon: 'palette',
              name: 'standard3',
              onPress: () => {},
            },
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.setState({ onScreen: 'Main' }),
            },
          ],
        };
    }
  }

  renderCard(cards) {
    const { showSubs } = this.state;
    return cards.map(({
      icon, title, onPress, subtitle,
    }) => (
      <SettingsCard
        key={title}
        icon={icon}
        title={title}
        onPress={onPress}
        opacity={showSubs ? 1 : 0}
        type={showSubs ? 'material-community' : 'entypo'}
      />
    ));
  }

  render() {
    const { showSubs } = this.state;
    const Colors = ThemeSelector(this.props.auth.theme);
    const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];
    const containerStyle = [
      styles.subContainer,
      { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
    ];
    const content = this.getContent();
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title="Settings" />
        <View style={containerStyle}>{this.renderCard(content.options)}</View>
        <ActionButton buttons={getButtons(this.props)} />
      </LinearGradient>
    );
  }
}

const getButtons = (props) => {
  const { toggleDrawer } = props;

  switch (true) {
    case false:
      return [
        {
          icon: 'menu',
          animation: 'zoomIn',
          onPress: () => toggleDrawer(),
        },
      ];
    case true:
      return [
        {
          icon: 'menu',
          animation: 'zoomIn',
          onPress: () => toggleDrawer(),
        },
        {
          icon: 'back',
          animation: 'zoomIn',
          onPress: () => {},
        },
      ];
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
