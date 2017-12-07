import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';

import { Card } from '../Card';
import {
  fetchProgram,
  fetchAllPrograms,
  fetchAllExercises,
  updateScreenIndex,
  updateSelectedDayKey,
} from '../../actions/program_actions';

class Programs extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchProgram());
    dispatch(fetchAllPrograms());
    dispatch(fetchAllExercises());
  }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { dispatch } = this.props;
    if (screenIndex) dispatch(updateScreenIndex(screenIndex));
    if (selectedDayKey) dispatch(updateSelectedDayKey(selectedDayKey));
    if (selectedProgram) dispatch(fetchProgram(selectedProgram));
  }

  renderAllPrograms = () => {
    return (
      this.props.allPrograms.map(program => {
        return (
          <Card
            item={program}
            key={program.key}
            icon={'clipboard'}
            subtitle={`${program.frequency} Days - ${program.level} - ${program.type}`}
            onPress={() => this.updateScreenIndex('selectedProgram', null, program.key)}
          />
        );
      })
    );
  }

  renderProgramDays = program => {
    return (
      program.map(day => {
        return (
          <Card
            item={day}
            key={day.key}
            icon={'folder'}
            subtitle={`${day.primaryGroup} - ${day.secondaryGroup}`}
            onPress={() => this.updateScreenIndex('programExercises', day.key)}
          />
        );
      })
    );
  }

  renderProgramExercises = exercises => {
    return (
      exercises.map(exercise => {
        if (exercise.day === this.props.selectedDayKey) {
          const match = this.props.allExercises.find(eachExercise => {
            return eachExercise.key === exercise.exerciseKey;
          });
          // Modify match with actual exercise key, to facilitate deleting form program
          const item = Object.assign({}, match, { key: exercise.key });
          return (
            <Card
              item={item}
              key={item.key}
              icon={'folder'}
              onPress={() => this.updateScreenIndex('programExercises')}
              subtitle={`${exercise.sets} Sets - ${exercise.reps} Reps - ${exercise.rest}s Rest`}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { loading, screenIndex } = this.props;
    // if (loading) {
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <Text style={styles.loadingText}>SwoleMate</Text>
    //       <Text style={styles.loadingTextSub}>Loading...</Text>
    //       <ProgressBar width={200} indeterminate color={styles.$primaryColor} />
    //     </View>
    //   );
    // }

    let renderType;
    switch (screenIndex) {
      default:
        return;
      case 'allPrograms':
        renderType = this.renderAllPrograms();
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        renderType = this.renderProgramDays(this.props.programDays);
        break;
      case 'programExercises':
        renderType = this.renderProgramExercises(this.props.programExercises);
        break;
      case 'addProgram':
      case 'addProgramDay':
      case 'addProgramExercise':
        return null;
    }

    return (
      <Animatable.View>
        {renderType}
      </Animatable.View>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    // Various
    theme: theme.selected,
    loading: program.loading,
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
    // All Exercises
    allExercises: program.allExercises,
    // All Programs
    allPrograms: program.programs,
    // Primary or Selected Program
    programInfo: program.info,
    programDays: program.days,
    programExercises: program.exercises,
  };
};

export default connect(mapStateToProps)(Programs);
