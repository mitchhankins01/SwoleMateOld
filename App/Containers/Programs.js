import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { deleteFB } from '../Helpers/Firebase';
import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Program';
import { ProgramCard } from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';

import styles, { gradients, textColor } from './Styles/ProgramStyles';

const getProgramButtons = (props) => {
  const {
    addHandler, toggleDrawer, toggleExercises, program: { showExercises },
  } = props;

  switch (showExercises) {
    case false:
      return [
        {
          icon: 'menu',
          animation: 'zoomIn',
          onPress: () => toggleDrawer(),
        },
        {
          icon: 'plus',
          animation: 'zoomIn',
          onPress: () => addHandler(),
        },
      ];
    case true:
      return [
        {
          icon: 'back',
          animation: 'zoomIn',
          onPress: () => toggleExercises(false, null),
        },
        {
          icon: 'rocket',
          animation: 'zoomIn',
          onPress: () => {}, // Start Lift
        },
        {
          icon: 'plus',
          animation: 'zoomIn',
          onPress: () => addHandler(),
        },
      ];
    default:
      return null;
  }
};

const Programs = (props) => {
  const {
    programs,
    getPrograms,
    toggleExercises,
    program: {
      days, dayKey, exercises, showExercises, loading, info,
    },
  } = props;

  if (loading || programs.loading) return null;
  const programId = info.map(({ id }) => id).toString();
  const title = showExercises ? 'Exercises' : info.map(({ name }) => name).toString();
  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title={title} />
      <FlatList
        data={showExercises ? exercises.filter(e => e.day === dayKey) : days}
        extraData={props.program}
        renderItem={({ item }) => (
          <ProgramCard
            opacity={showExercises ? 1 : 0}
            icon={showExercises ? 'dumbbell' : 'folder'}
            type={showExercises ? 'material-community' : 'entypo'}
            onPress={showExercises ? null : () => toggleExercises(true, item.key)}
            onDelete={() => deleteFB(programId, dayKey, item.type, item.key)}
            subtitle={
              showExercises
                ? `${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest (s)`
                : `${item.primaryGroup} - ${item.secondaryGroup}`
            }
            title={
              showExercises
                ? programs.allExercises.find(e => e.key === item.exerciseKey).name
                : item.name
            }
          />
        )}
        s
      />
      <ActionButton buttons={getProgramButtons(props)} />
      {programs.fetched ? null : getPrograms()}
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  getPrograms: () => dispatch(Actions.getPrograms()),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
  addHandler: () => dispatch(NavigationActions.navigate({ routeName: 'AddProgram' })),
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
