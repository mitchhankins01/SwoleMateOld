import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Program';
import ProgramCard from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';

import styles, { gradients, textColor } from './Styles/AddProgramStyles';

const Programs = ({ goBack, program: { showExercises } }) => (
  <LinearGradient style={styles.container} colors={gradients}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header title={showExercises ? 'Add Exercise' : 'Add Workout'} />
    <ActionButton buttons={getButtons(goBack)} />
  </LinearGradient>
);

const getButtons = goBack => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
  {
    icon: 'check',
    animation: 'zoomIn',
    onPress: () => {}, // Add Program
  },
];

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
