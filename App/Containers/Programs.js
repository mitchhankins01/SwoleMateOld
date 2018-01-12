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
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header title="Programs" />
    <ProgramCard />
  </LinearGradient>
);

const mapStateToProps = state => ({
  program: state.program,
});

const mapDispatchToProps = dispatch => ({
  getPrograms: dispatch(Actions.getPrograms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
