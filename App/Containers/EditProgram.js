import React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import styles from './Styles/EditProgramStyles';
import * as Actions from '../Redux/Actions/Program';
import ActionButton from '../Components/ActionButton';
import { EditProgramCard } from '../Components/ProgramCard';

const EditProgram = ({
  goBack,
  program: { showExercises },
  navigation: { state: { params: { edit, programId, item } } },
}) => {
  const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
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
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
