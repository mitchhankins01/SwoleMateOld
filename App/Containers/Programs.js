import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import { Fonts, Colors } from '../Themes';
import styles, { gradients, textColor } from './Styles/ProgramStyles';

const Programs = props => (
  <LinearGradient style={styles.container} colors={gradients}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header title="Programs" />
  </LinearGradient>
);

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  //   startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(Programs);
