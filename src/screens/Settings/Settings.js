import Color from 'color';
import { toJS } from 'mobx';
import { View, TextInput } from 'react-native';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react';
import { Avatar, Icon } from 'react-native-elements';
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

  state = {
    updateValue: '',
    showInput: false,
    screenIndex: 'Main',
    name: this.props.userStore.name,
    email: firebase.auth().currentUser.email,
  };

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
              onPress: () => this.setState({ showInput: true, updateValue: 'name' })
            },
            {
              title: 'Email',
              icon: 'email',
              onPress: () => this.setState({ showInput: true, updateValue: 'email' })
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
    const { updateName, updateEmail } = this.props.userStore;
    const { showInput, updateValue } = this.state;

    const getInput = () => {
      switch (updateValue) {
        default: return null;
        case 'name':
        case 'email':
          return (
            <View>
              <TextInput
                style={this.getStyles().textInput}
                onChangeText={text => this.setState({ [updateValue]: text })}
                value={updateValue === 'name' ? this.state.name : this.state.email}
              />
              <View style={this.getStyles().buttonView}>
                <Icon
                  size={80}
                  name='cross'
                  type='entypo'
                  color={styles.$primaryColor}
                  onPress={() => this.setState({ showInput: false, updateValue: '' })}
                />
                <Icon
                  size={75}
                  name='check'
                  type='entypo'
                  color={styles.$primaryColor}
                  onPress={() => {
                    this.setState({ showInput: false, updateValue: '' });
                    if (updateValue === 'name') return updateName(this.state.name);
                    if (updateValue === 'email') return updateEmail(this.state.email);
                  }}
                />
              </View>
            </View>
          );
      }
    };

    if (!showInput) return null;
    return (
      <View style={this.getStyles().inputContainer}>
        {getInput()}
      </View>
    );
  }

  renderError() {
    const { error, showError } = this.props.userStore;

    if (showError) {
     this.dropdown.alertWithType('error', 'Whoops', error.message || 'Something went wrong!');
    }
  }

  renderSuccess() {
    const { showSuccess } = this.props.userStore;

    if (showSuccess) {
       this.dropdown.alertWithType('success', 'Bam!', 'Changes Saved');
    }
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
        {this.renderError()}
        {this.renderSuccess()}
        <DropdownAlert
          translucent
          closeInterval={2000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
          successColor={styles.$tertiaryColor}
          titleStyle={this.getStyles().dropdownTitle}
          messageStyle={this.getStyles().dropdownMessage}
          onClose={() => this.props.userStore.toggleError(false)}
        />
      </LinearGradient>
    );
  }

  getStyles() {
    const styles = themeStyles[this.props.userStore.selected];
    const backgroundColor = Color(styles.$tertiaryColor).alpha(0.7);

    return {
      inputContainer: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        height: 40,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
        borderColor: styles.$primaryColor,
        backgroundColor: styles.$tertiaryColor,
      },
      buttonView: {
        paddingTop: 50,
        marginBottom: -150,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      dropdownTitle: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: -36,
        color: '#EDF0F1',
        alignSelf: 'center',
        fontFamily: 'Exo-Bold',
      },
      dropdownMessage: {
        fontSize: 16,
        marginLeft: -36,
        color: '#EDF0F1',
        alignSelf: 'center',
        fontFamily: 'Exo-Medium',
      },
    };
  }
}

export default Settings;
