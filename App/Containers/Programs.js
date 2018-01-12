import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import * as Actions from '../Redux/Actions/Program';
import Header from '../Components/Header';
import ProgramCard from '../Components/ProgramCard';

import styles, { gradients, textColor } from './Styles/ProgramStyles';

const Programs = (props) => {
  const {
    toggleExercises,
    program: {
      days, dayKey, exercises, showExercises,
    },
    programs: { allExercises },
  } = props;

  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title="Programs" />
      <FlatList
        data={showExercises ? exercises.filter(e => e.day === dayKey) : days}
        renderItem={({ item }) => (
          <ProgramCard
            icon={showExercises ? 'dumbbell' : 'folder'}
            type={showExercises ? 'material-community' : 'entypo'}
            onPress={showExercises ? null : () => toggleExercises(true, item.key)}
            subtitle={
              showExercises
                ? `${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest (s)`
                : `${item.primaryGroup} - ${item.secondaryGroup}`
            }
            title={
              showExercises ? allExercises.find(e => e.key === item.exerciseKey).name : item.name
            }
          />
        )}
      />
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
