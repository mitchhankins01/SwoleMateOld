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
import { ProgramCard } from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';
// import * as Actions from '../Redux/Actions/Settings';

class Settings extends Component {
  state = {
    showSubs: false,
    name: this.props.auth.name,
    email: firebase.auth().currentUser.email,
    password: firebase.auth().currentUser.email,
  };

  renderCard(cards) {
    const { showSubs } = this.state;
    return cards.map(({
      icon, title, onPress, subtitle,
    }) => (
      <ProgramCard
        key={title}
        icon={icon}
        title={title}
        onPress={onPress}
        subtitle={subtitle}
        opacity={showSubs ? 1 : 0}
        type={showSubs ? 'material-community' : 'entypo'}
      />
    ));
  }

  renderMain() {
    const Colors = ThemeSelector(this.props.auth.theme);
    const containerStyle = [
      styles.subContainer,
      { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
    ];
    this.cards = [
      {
        icon: 'user',
        title: 'Profile',
        subtitle: 'subttl',
        onPress: () => {},
      },
      {
        icon: 'list',
        title: 'General',
        subtitle: 'subttl',
        onPress: () => {},
      },
    ];
    return (
      <View style={containerStyle}>
        <Icon name="close" />
      </View>
    );
  }

  render() {
    const { showSubs } = this.state;
    const Colors = ThemeSelector(this.props.auth.theme);
    const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title="Settings" />
        {!showSubs ? this.renderMain() : this.renderSubs()}
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
