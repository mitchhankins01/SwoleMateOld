import React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import styles from './Styles/SettingsStyles';
import * as Actions from '../Redux/Actions/Program';
import ActionButton from '../Components/ActionButton';

const Settings = ({
  goBack,
  program: { showExercises },
  navigation: { state: { params: { edit, programId, item } } },
}) => (
  <LinearGradient style={styles.container} colors={gradients}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header title="Settings" />
    <ActionButton buttons={getButtons(props)} />
  </LinearGradient>
);

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
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
