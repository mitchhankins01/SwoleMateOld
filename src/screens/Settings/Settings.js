import Color from 'color';
import { View } from 'react-native';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react';
import { Avatar } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import themeStyles from './styles';
import { Card } from '../../components/Card';
import Header from '../../components/Header';

@inject('userStore') @observer
class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        size={26}
        style={{ color: tintColor }}
        name={focused ? 'ios-settings' : 'ios-settings-outline'}
      />
    ),
  };

  state = { screenIndex: 'Main', showInput: false, updateValue: '' };

  // showDropdown(type, title, message) {
  //   this.dropdown.alertWithType(type, title, message);
  // }
  //
  // handleThemeSelection(index, theme) {
  //   if (index === themes.length - 1) {
  //     return this.setState({ screenIndex: -1 });
  //   }
  //   this.props.userStore.updateTheme(theme);
  // }

  renderContent() {
    const { imperial, toggleImperial, updateTheme } = this.props.userStore;

    switch (this.state.screenIndex) {
      default: return { title: 'Error', options: [{ title: 'Error' }] };
      case 'Main':
        return {
          title: 'Main',
          options: [
            {
              title: 'Profile',
              icon: 'user',
              onPress: () => this.setState({ screenIndex: 'Profile' })
            },
            {
              title: 'General',
              icon: 'list',
              onPress: () => this.setState({ screenIndex: 'General' })
            },
            {
              title: 'Theme',
              icon: 'palette',
              onPress: () => this.setState({ screenIndex: 'Theme' })
            },
            {
              title: 'Logout',
              icon: 'power-plug',
              onPress: () => firebase.auth().signOut()
            },
          ]
        };
      case 'Profile':
        return {
          title: 'Profile',
          options: [
            {
              title: 'Name',
              icon: 'message',
              onPress: () => this.setState({ showInput: true, updateValue: 'Name' })
            },
            {
              title: 'Gender',
              icon: 'man'
            },
            {
              title: 'Email',
              icon: 'email'
            },
            {
              title: 'Password',
              icon: 'lock'
            },
            {
              title: 'Delete Account',
              icon: 'trash'
            },
          ]
        };
      case 'General':
        return {
          title: 'General',
          options: [
            {
              title: imperial ? 'Use Metric System (Kg)' : 'Use Imperial System (Lb)',
              icon: 'suitcase',
              onPress: () => toggleImperial()
            }
          ]
        };
      case 'Theme':
        return {
          title: 'Theme',
          options: [
            {
              title: 'Male',
              icon: 'palette',
              name: 'standard',
              onPress: () => updateTheme('standard')
            },
            {
              title: 'Female',
              icon: 'palette',
              name: 'standard2',
              onPress: () => updateTheme('standard2')
            },
            {
              title: 'Other',
              icon: 'palette',
              name: 'standard3',
              onPress: () => updateTheme('standard3')
            },
          ]
        };
    }
  }

  renderInput(styles) {
    const { showInput, updateValue } = this.state;
    const backgroundColor = Color(styles.$tertiaryColor).alpha(0.7);

    const getInput = () => {
      switch (updateValue) {
        default: return null;
        case 'Name':
          return (
            null
          );
      }
    };

    if (!showInput) return null;
    return (
      <View style={[thisStyles.inputContainer, { backgroundColor }]}>
        {getInput()}
      </View>
    );
  }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container}>
        <Header title={'Settings'} styles={styles} />
        <Card
          settingsCard
          content={this.renderContent()}
          onPressOption={onPress => onPress()}
          gotoMain={() => this.setState({ screenIndex: 'Main' })}
        >
          <Avatar
            xlarge
            rounded
            activeOpacity={0.7}
            containerStyle={styles.avatar}
            onPress={() => console.log('Works!')}
            source={{ uri: 'https://avatars0.githubusercontent.com/u/25047564?s=400&u=448846745e78cadb366ef01444365e0c6f12a73f&v=4' }}
          />
        </Card>
        {this.renderInput(styles)}
      </LinearGradient>
    );
  }
}

export default Settings;

const thisStyles = {
  inputContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'red',
  },
};
