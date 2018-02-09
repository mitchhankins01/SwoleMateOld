/* eslint react/prop-types: 0 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StatusBar, FlatList, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import * as Actions from '../Redux/Actions/Program';
import ActionButton from '../Components/ActionButton';
import { ProgramCard } from '../Components/ProgramCard';
import { DeleteFB, ToggleUp, ToggleDown } from '../Helpers/Firebase';

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

class Programs extends Component {
  state = {};

  render() {
    const {
      programs,
      editProgram,
      toggleExercises,
      program: {
        days, dayKey, exercises, showExercises, loading, info,
      },
    } = this.props;
    if (loading || programs.loading) return <Loading />;
    const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];

    const programId = info.map(({ id }) => id).toString();
    const data = showExercises ? exercises.filter(e => e.day === dayKey) : days;
    const title = showExercises ? 'Exercises' : info.map(({ name }) => name).toString();

    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title={title} />
        {data.length === 0 ? (
          <Text style={styles.emptyText}>
            {showExercises
              ? 'This Workout is empty, tap the lower right button to get started'
              : 'This Program is empty, tap the lower right button to get started'}
          </Text>
        ) : null}
        <FlatList
          extraData={this.props.program}
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
        <ActionButton buttons={getProgramButtons(this.props)} />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => ({
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
