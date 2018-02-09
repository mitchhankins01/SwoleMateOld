/* eslint react/prop-types: 0 */
import { capitalize } from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StatusBar, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import Alert from '../Components/Alert';
import styles from './Styles/SettingsStyles';
import ActionButton from '../Components/ActionButton';
import { SettingsCard } from '../Components/SettingsCard';
import * as Actions from '../Redux/Actions/Settings';

class Settings extends Component {
  state = {
    toUpdate: '',
    onScreen: 'Main',
    name: this.props.auth.name,
    email: firebase.auth().currentUser.email,
    password: 'Send Reset Password Email to:',
  };

  getContent() {
    const { toggleImperial } = this.props;
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
              onPress: () => Actions.toggleImperial(this.props.auth.imperial),
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
              onPress: () => Actions.updateTheme('standard'),
            },
            {
              title: 'Female',
              icon: 'palette',
              name: 'standard2',
              onPress: () => Actions.updateTheme('standard2'),
            },
            {
              title: 'Other',
              icon: 'palette',
              name: 'standard3',
              onPress: () => Actions.updateTheme('standard3'),
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

  renderCompleteAlert() {
    return (
      <Alert
        acknowledge
        title="Change Saved"
        message="Changes Successfully Saved"
        onPressClose={() => this.setState({ toUpdate: '' })}
      />
    );
  }

  renderInput() {
    const toUpdate = capitalize(this.state.toUpdate);

    if (toUpdate === 'Delete') {
      return (
        <Alert
          input
          title="Are you Sure?"
          style={{ height: 0, width: 0 }}
          onPressClose={() => this.setState({ toUpdate: '' })}
          message="This action cannot be undone, and your data will be permanently lost."
        />
      );
    }
    return (
      <Alert
        input
        title={toUpdate}
        onPressSave={() => {}}
        style={styles.textInput}
        message={`Change your ${toUpdate}`}
        value={this.state[this.state.toUpdate]}
        onPressClose={() => this.setState({ toUpdate: '' })}
      />
    );
  }

  renderCard(cards) {
    const { showSubs } = this.state;
    return cards.map(({ icon, title, onPress }) => (
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
    const { toUpdate } = this.state;
    const { status: { complete } } = Actions;
    const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
    const content = this.getContent();
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title="Settings" />
        <View style={styles.subContainer}>{this.renderCard(content.options)}</View>
        <ActionButton buttons={getButtons(this.props)} />
        {toUpdate ? this.renderInput() : null}
        {complete ? this.renderCompleteAlert() : null}
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
