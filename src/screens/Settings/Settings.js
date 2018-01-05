import Color from 'color';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react';
import { Avatar, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

import themeStyles from './styles';
import { Card } from '../../components/Card';
import Header from '../../components/Header';
import { Alert } from '../../components/Alert';

@inject('userStore') @observer
class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor, focused }) => (
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
    name: this.props.userStore.name,
    email: firebase.auth().currentUser.email,
    password: firebase.auth().currentUser.email,
  };

  componentWillUnmount() {
    this.props.userStore.updateScreenIndex('Main');
  }

  renderContent() {
    const {
      imperial, toggleImperial, updateTheme, screenIndex, updateScreenIndex
    } = this.props.userStore;

    switch (screenIndex) {
      default: return { title: 'Error', options: [{ title: 'Error' }] };
      case 'Main':
        return {
          title: 'Main',
          options: [
            {
              title: 'Profile',
              icon: 'user',
              onPress: () => updateScreenIndex('Profile')
            },
            {
              title: 'General',
              icon: 'list',
              onPress: () => updateScreenIndex('General')
            },
            {
              title: 'Theme',
              icon: 'palette',
              onPress: () => updateScreenIndex('Theme')
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
              icon: 'lock',
              onPress: () => this.setState({ showInput: true, updateValue: 'password' })
            },
            {
              title: 'Delete Account',
              icon: 'trash',
              onPress: () => this.setState({ showInput: true, updateValue: 'delete' })
            },
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.props.userStore.updateScreenIndex('Main')
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
            },
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.props.userStore.updateScreenIndex('Main')
            },
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
            {
              title: 'Back',
              icon: 'back',
              onPress: () => this.props.userStore.updateScreenIndex('Main')
            },
          ]
        };
    }
  }

  renderInput(styles) {
    const { showInput, updateValue } = this.state;
    const { updateName, updateEmail, updatePassword, deleteUser } = this.props.userStore;
    const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();

    const getInput = () => {
      switch (updateValue) {
        default: return null;
        case 'name':
          return (
            <Alert
              input
              title='Name'
              message='Change Name'
              value={this.state[updateValue]}
              style={this.getStyles().textInput}
              onChangeText={text => this.setState({ [updateValue]: text })}
              onPressClose={() => this.setState({ showInput: false, updateValue: '' })}
              onPressSave={() => {
                this.setState({ showInput: false, updateValue: '' });
                return updateName(this.state.name);
              }}
            />
          );
        case 'email':
          return (
            <Alert
              input
              title='Email'
              message='Change Email'
              value={this.state[updateValue]}
              style={this.getStyles().textInput}
              onChangeText={text => this.setState({ [updateValue]: text })}
              onPressClose={() => this.setState({ showInput: false, updateValue: '' })}
              onPressSave={() => {
                this.setState({ showInput: false, updateValue: '' });
                return updateEmail(this.state.email);
              }}
            />
          );
        case 'password':
          return (
            <Alert
              input
              title='Password'
              message='Your password-reset email will be sent here'
              value={this.state[updateValue]}
              style={this.getStyles().textInput}
              onChangeText={text => this.setState({ [updateValue]: text })}
              onPressClose={() => this.setState({ showInput: false, updateValue: '' })}
              onPressSave={() => {
                this.setState({ showInput: false, updateValue: '' });
                updatePassword(this.state.password);
              }}
            />
          );
        case 'delete':
          return (
            <Alert
              title='Delete Account'
              message='Are you sure? All your data will be deleted :('
              value={this.state[updateValue]}
              style={this.getStyles().textInput}
              onChangeText={text => this.setState({ [updateValue]: text })}
              onPressClose={() => this.setState({ showInput: false, updateValue: '' })}
              onPressSave={() => {
                this.setState({ showInput: false, updateValue: '' });
                return deleteUser();
              }}
            />
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

  render() {
    const { error, showError, selected, showSuccess, toggleShowSuccess, toggleError } = this.props.userStore;
    const styles = themeStyles[selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container}>
        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
        <Header title={'Settings'} styles={styles} navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          <Card
            settingsCard
            content={this.renderContent()}
            onPressOption={onPress => onPress()}
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
        </View>
        {this.renderInput(styles)}
        {showError ?
          <Alert
            acknowledge
            title='Whoops'
            onPressSave={() => toggleError(false)}
            message={error.message || 'Something went wrong! :('}
          />
          : null}
        {showSuccess ?
          <Alert
            acknowledge
            title='Yay!'
            message='Changes saved :)'
            onPressSave={() => toggleShowSuccess(false)}
          />
          : null}
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
        elevation: 5,
        backgroundColor,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
        height: 40,
        width: 300,
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        color: '#EDF0F1',
        alignSelf: 'center',
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
      passwordText: {
        fontSize: 20,
        color: '#EDF0F1',
        // marginBottom: -150,
        alignSelf: 'center',
        fontFamily: 'Exo-Bold',
      },
      deleteText: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
        marginHorizontal: 20,
        fontFamily: 'Exo-Bold',
      },
    };
  }
}

export default Settings;
