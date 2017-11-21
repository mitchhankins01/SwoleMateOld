import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem, Avatar } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import firebase from 'react-native-firebase';
import themeStyles from '../components/styles';
import Header from '../components/Header';
import { standard, standard2, standard3, handleThemeSelection } from '../components/theme';
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
    this.state = {
      theme: 'standard',
      screenIndex: -1
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid)
      .onSnapshot(userDoc => {
          this.setState({ theme: userDoc.data().theme });
      });
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

    // Came from redux props Settings
    const dispatch = () => {};

    switch (this.state.screenIndex) {
      case 0:
        return (
          profileOptions.map((item, i) => (
            <ListItem
              onPress={() => handleProfileSelection(i, () => this.setState({ screenIndex: -1 }))}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              hideChevron={i === profileOptions - 1}
              underlayColor={styles.$secondaryColor}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemTitle}
              title={item.title}
              key={i}
            />
          ))
        );
      case 1:
        return (
          generalOptions.map((item, i) => (
            <ListItem
              onPress={() => handleGeneralSelection(i, () => this.setState({ screenIndex: -1 }))}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              hideChevron={i === profileOptions - 1}
              underlayColor={styles.$secondaryColor}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemTitle}
              title={item.title}
              key={i}
            />
          ))
        );
      case 2:
        return (
          themes.map((theme, i) => (
            <ListItem
              onPress={() => handleThemeSelection(
                themes, i, theme.name, () => this.setState({ screenIndex: -1 })
              )}
              titleStyle={[styles.listItemTitle, { color: themeOptions[i] }]}
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              leftIcon={{ name: theme.icon, color: themeOptions[i] }}
              hideChevron={i === themes.length - 1}
              underlayColor={styles.$secondaryColor}
              chevronColor={themeOptions[i]}
              title={theme.title}
              key={i}
            />
          ))
        );
      default:
        return (
          main.map((item, i) => (
            <ListItem
              onPress={
                i === main.length - 1
                ? () => firebase.auth().signOut()
                : () => this.setState({ screenIndex: i })
              }
              containerStyle={{ borderBottomColor: styles.$primaryColor }}
              leftIcon={{ name: item.icon, color: styles.$primaryColor }}
              hideChevron={i === main.length - 1}
              underlayColor={styles.$secondaryColor}
              chevronColor={styles.$primaryColor}
              titleStyle={styles.listItemTitle}
              title={item.title}
              key={i}
            />
          ))
        );
    }
  }

  render() {
    const styles = themeStyles[this.state.theme];
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
      <Header
        title={'Settings'}
        bgColor={styles.$secondaryColor}
        textColor={styles.$primaryColor}
      />
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

export default Settings;
