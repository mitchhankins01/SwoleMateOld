import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Program';
import ProgramCard from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';

import styles, { gradients, textColor } from './Styles/AddProgramStyles';

const Programs = (props) => {
  const {} = props;

  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title="Add" />
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  getPrograms: dispatch(Actions.getPrograms()),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
