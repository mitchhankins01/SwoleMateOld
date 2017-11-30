import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem, Avatar } from 'react-native-elements';

import Header from '../components/Header';
import themeStyles from '../components/styles';
import { changeTheme } from '../actions/themeActions';
import { standard, standard2, standard3 } from '../components/theme';
import {
  main,
  generalOptions,
  themes,
  profileOptions,
  handleProfileSelection,
  handleGeneralSelection
} from '../config/settings';

class Settings extends Component {

  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-settings' : 'ios-settings-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  constructor() {
    super();
    this.state = { screenIndex: -1 };
  }

  showDropdown(type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  }

  renderContent(styles) {
    const themeOptions = [
      standard.$primaryColor,
      standard2.$primaryColor,
      standard3.$primaryColor,
      styles.$primaryColor
    ];

    switch (this.state.screenIndex) {
      case 0:
        return (
          profileOptions.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              underlayColor={'transparent'}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemSettingsTitle}
              hideChevron={i === profileOptions.length - 1}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              onPress={() => handleProfileSelection(i, () => this.setState({ screenIndex: -1 }))}
            />
          ))
        );
      case 1:
        return (
          generalOptions.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              underlayColor={'transparent'}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemSettingsTitle}
              hideChevron={i === generalOptions.length - 1}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              onPress={() => handleGeneralSelection(i, () => this.setState({ screenIndex: -1 }))}
            />
          ))
        );
      case 2:
        return (
          themes.map((theme, i) => (
            <ListItem
              key={i}
              title={theme.title}
              underlayColor={'transparent'}
              chevronColor={themeOptions[i]}
              hideChevron={i === themes.length - 1}
              leftIcon={{ name: theme.icon, color: themeOptions[i] }}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              titleStyle={[styles.listItemSettingsTitle, { color: themeOptions[i] }]}
              onPress={() => this.props.dispatch(
                changeTheme(themes, i, theme.name, () => this.setState({ screenIndex: -1 }))
              )}
            />
          ))
        );
      default:
        return (
          main.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              underlayColor={'transparent'}
              hideChevron={i === main.length - 1}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemSettingsTitle}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              onPress={
                i === main.length - 1
                ? () => firebase.auth().signOut()
                : () => this.setState({ screenIndex: i })
              }
            />
          ))
        );
    }
  }

  render() {
    const styles = themeStyles[this.props.theme];
    const gradients = [
      styles.$primaryColor,
      styles.$secondaryColor,
      styles.$tertiaryColor
    ];

    return (
      <LinearGradient
        colors={gradients}
        style={[styles.container, { justifyContent: 'flex-start' }]}
      >
      <Header title={'Settings'} styles={styles} />
        <Avatar
          xlarge
          rounded
          source={{ uri: 'https://avatars0.githubusercontent.com/u/25047564?s=400&u=448846745e78cadb366ef01444365e0c6f12a73f&v=4' }}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          containerStyle={styles.avatar}
        />
        <List containerStyle={styles.list}>
          {this.renderContent(styles)}
        </List>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          updateStatusBar={false}
          closeInterval={700}
          translucent
        />
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({ theme }) => {
  return {
    theme: theme.selected,
  };
};

export default connect(mapStateToProps)(Settings);
