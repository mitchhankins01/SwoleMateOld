import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, FlatList, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { DeleteFB, ToggleUp, ToggleDown } from '../Helpers/Firebase';
import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Program';
import { ProgramCard } from '../Components/ProgramCard';
import ActionButton from '../Components/ActionButton';

import { ThemeSelector } from '../Themes';
import styles from './Styles/ProgramStyles';

const getProgramButtons = (props) => {
  const {
    addHandler,
    toggleDrawer,
    launchHandler,
    toggleExercises,
    program: { showExercises },
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
          onPress: () => launchHandler(),
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
    theme,
    programs,
    getPrograms,
    editProgram,
    toggleExercises,
    program: {
      days, dayKey, exercises, showExercises, loading, info,
    },
  } = props;
  const Colors = ThemeSelector(theme);
  const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];

  if (loading || programs.loading) {
    return <LinearGradient style={styles.container} colors={gradients} />;
  }

  const programId = info.map(({ id }) => id).toString();
  const data = showExercises ? exercises.filter(e => e.day === dayKey) : days;
  const title = showExercises ? 'Exercises' : info.map(({ name }) => name).toString();
  return (
    <LinearGradient style={styles.container} colors={gradients}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header title={title} />
      {data.length === 0 ? (
        <Text
          style={[styles.emptyText, { backgroundColor: Colors.secondaryColor, color: Colors.text }]}
        >
          {showExercises
            ? 'This Workout is empty, tap the lower right button to get started'
            : 'This Program is empty, tap the lower right button to get started'}
        </Text>
      ) : null}
      <FlatList
        extraData={props.program}
        data={data}
        renderItem={({ item }) => (
          <ProgramCard
            opacity={showExercises ? 1 : 0}
            onEdit={() => editProgram(programId, item)}
            icon={showExercises ? 'dumbbell' : 'folder'}
            type={showExercises ? 'material-community' : 'entypo'}
            onDelete={() => DeleteFB(programId, dayKey, item.type, item.key)}
            onPress={showExercises ? null : () => toggleExercises(true, item.key)}
            onToggleUp={() => ToggleUp(days, programId, item, exercises, dayKey)}
            onToggleDown={() => ToggleDown(days, programId, item, exercises, dayKey)}
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
      />
      <ActionButton buttons={getProgramButtons(props)} />
      {programs.fetched ? null : getPrograms()}
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => ({
  getPrograms: () => dispatch(Actions.getPrograms()),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
  launchHandler: () => dispatch(NavigationActions.navigate({ routeName: 'Workout' })),
  addHandler: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditProgram', params: { edit: false } })),
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
  editProgram: (programId, item) =>
    dispatch(NavigationActions.navigate({
      routeName: 'EditProgram',
      params: {
        item,
        programId,
        edit: true,
      },
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
