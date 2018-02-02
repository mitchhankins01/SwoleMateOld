import React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import { ThemeSelector } from '../Themes/';
import styles from './Styles/SettingsStyles';
import ActionButton from '../Components/ActionButton';
// import * as Actions from '../Redux/Actions/Settings';

const Settings = (props) => {
  const Colors = ThemeSelector(props.theme);
  const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];

  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title="Settings" />
      <ActionButton buttons={getButtons(props)} />
    </LinearGradient>
  );
};

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
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
