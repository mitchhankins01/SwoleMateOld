import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import * as Actions from '../Redux/Actions/Program';
import Header from '../Components/Header';
import ProgramCard from '../Components/ProgramCard';

import styles, { gradients, textColor } from './Styles/ProgramStyles';

const Programs = props => (
  <LinearGradient style={styles.container} colors={gradients}>
    {props.getPrograms()}
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header title="Programs" />
    <ProgramCard />
  </LinearGradient>
);

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  getPrograms: () => dispatch(Actions.getPrograms()),
  //   startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(Programs);
