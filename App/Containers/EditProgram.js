import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Program';
import { EditProgramCard } from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';

import { ThemeSelector } from '../Themes';
import styles from './Styles/EditProgramStyles';

const EditProgram = ({
  theme,
  goBack,
  program: { showExercises },
  navigation: { state: { params: { edit, programId, item } } },
}) => {
  const Colors = ThemeSelector(theme);
  const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];
  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title={showExercises ? 'Add Exercise' : 'Add Workout'} />
      <EditProgramCard edit={edit} item={item} programId={programId} />
      <ActionButton buttons={getButtons(goBack)} />
    </LinearGradient>
  );
};

const getButtons = goBack => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
];

const mapStateToProps = state => ({
  program: state.program,
  theme: state.auth.theme,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
