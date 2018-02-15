/* eslint react/prop-types: 0 */
import { capitalize } from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import * as A from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, View, BackHandler } from 'react-native';

import Header from '../Components/Header';
import Alert from '../Components/Alert';
import styles from './Styles/SettingsStyles';
import ActionButton from '../Components/ActionButton';
import { SettingsCard } from '../Components/SettingsCard';
import * as Actions from '../Redux/Actions/Settings';

class Settings extends Component {
  state = {
    error: '',
    toUpdate: '',
    onScreen: 'Main',
    showSuccessAlert: false,
    name: this.props.auth.name,
    email: firebase.auth().currentUser.email,
    password: 'Send Reset Password Email to:',
  };

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.onScreen !== 'Main') {
        this.setState({ onScreen: 'Main' });
        return true;
      }
      this.props.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  getButtons() {
    const { toggleDrawer } = this.props;

    if (this.state.onScreen === 'Main') {
      return [
        {
          icon: 'menu',
          animation: 'zoomIn',
          onPress: () => toggleDrawer(),
        },
      ];
    }
    return [
      {
        icon: 'menu',
        animation: 'zoomIn',
        onPress: () => toggleDrawer(),
      },
      {
        icon: 'back',
        animation: 'zoomIn',
        onPress: () => this.setState({ onScreen: 'Main' }),
      },
    ];
  }

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
              onPress: () => this.setState({ toUpdate: 'name' }),
            },
            {
              title: 'Email',
              icon: 'email',
              onPress: () => this.setState({ toUpdate: 'email' }),
            },
            {
              title: 'Password',
              icon: 'lock',
              onPress: () => this.setState({ toUpdate: 'password' }),
            },
            {
              title: 'Delete Account',
              icon: 'trash',
              onPress: () => this.setState({ toUpdate: 'delete' }),
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
            {
              title: this.props.auth.imperial
                ? 'Use Metric System (Kg)'
                : 'Use Imperial System (Lb)',
              icon: 'suitcase',
              onPress: () =>
                Actions.toggleImperial(
                  this.props.auth.imperial,
                  error => this.setState({ error }),
                  () => this.setState({ showSuccessAlert: true, toUpdate: '' }),
                ),
            },
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
              onPress: () =>
                Actions.updateTheme('standard', () => this.setState({ showSuccessAlert: true })),
            },
            {
              title: 'Female',
              icon: 'palette',
              name: 'standard2',
              onPress: () =>
                Actions.updateTheme('standard2', () => this.setState({ showSuccessAlert: true })),
            },
            {
              title: 'Other',
              icon: 'palette',
              name: 'standard3',
              onPress: () =>
                Actions.updateTheme('standard3', () => this.setState({ showSuccessAlert: true })),
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

  renderErrorAlert() {
    return (
      <Alert
        acknowledge
        title="Whoops"
        message={this.state.error}
        onPressSave={() => this.setState({ error: '' })}
      />
    );
  }

  renderSuccessAlert() {
    return (
      <Alert
        acknowledge
        title="Change Saved"
        message="Changes Successfully Saved"
        onPressSave={() => this.setState({ showSuccessAlert: false })}
      />
    );
  }

  renderInput() {
    const toUpdate = capitalize(this.state.toUpdate);
    const value = this.state[this.state.toUpdate];
    if (toUpdate === 'Delete') {
      return (
        <Alert
          input
          title="Are you Sure?"
          style={{ height: 0, width: 0 }}
          onPressSave={() => Actions.deleteUser()}
          onPressClose={() => this.setState({ toUpdate: '' })}
          message="This action cannot be undone, and your data will be permanently lost."
        />
      );
    }
    return (
      <Alert
        input
        value={value}
        title={toUpdate}
        onPressSave={() => {}}
        style={styles.textInput}
        message={`Change your ${toUpdate}`}
        onPressClose={() => this.setState({ toUpdate: '' })}
        onChangeText={text => this.setState({ [this.state.toUpdate]: text })}
        onPressSave={() =>
          Actions.updateSetting(
            toUpdate,
            this.state[this.state.toUpdate],
            error => this.setState({ error }),
            () => this.setState({ showSuccessAlert: true, toUpdate: '' }),
          )
        }
      />
    );
  }

  renderCard(cards) {
    const { showSubs } = this.state;
    return cards.map(({ icon, title, onPress }, index) => (
      <A.View key={title} animation="zoomIn" delay={index * 250}>
        <SettingsCard
          icon={icon}
          title={title}
          onPress={onPress}
          opacity={showSubs ? 1 : 0}
          type={showSubs ? 'material-community' : 'entypo'}
        />
      </A.View>
    ));
  }

  render() {
    const { toUpdate, showSuccessAlert, error } = this.state;
    const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
    const content = this.getContent();
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title="Settings" />
        <View style={styles.subContainer}>{this.renderCard(content.options)}</View>
        <ActionButton buttons={this.getButtons()} />
        {toUpdate ? this.renderInput() : null}
        {error ? this.renderErrorAlert() : null}
        {showSuccessAlert ? this.renderSuccessAlert() : null}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.navigate({ routeName: 'Programs' })),
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
