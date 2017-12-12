import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';

import { Card } from '../Card';

@inject('themeStore', 'programStore') @observer
class Programs extends Component {
  state = {
    // Primary or Selected Program
    info: [],
    days: [],
    exercises: [],
    // Various
    error: '',
    loading: false,
    allPrograms: [],
    allExercises: [],
  }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { programStore } = this.props;

    if (screenIndex) programStore.updateScreenIndex(screenIndex);
    if (selectedDayKey) programStore.updateselectedDayKey(selectedDayKey);
    if (selectedProgram) programStore.fetchProgram(null, selectedProgram);
  }

  renderAllPrograms = () => {
    if (this.props.programStore.length === 0) return <Card empty title='Program' />;

    return (
      this.props.programStore.allPrograms.map(program => {
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

  renderProgramDays = () => {
    if (this.props.programStore.days.length === 0) return <Card empty title='Workout' />;

    return (
      this.props.programStore.days.map(day => {
        return (
          <Card
            item={day}
            key={day.key}
            icon={'folder'}
            info={this.state.info}
            subtitle={`${day.primaryGroup} - ${day.secondaryGroup}`}
            onPress={() => this.updateScreenIndex('programExercises', day.key)}
          />
        );
      })
    );
  }

  renderProgramExercises = () => {
    return (
      this.props.programStore.exercises.map(exercise => {
        if (exercise.day === this.props.programStore.selectedDayKey) {
          const match = this.props.programStore.allExercises.find(eachExercise => {
            return eachExercise.key === exercise.exerciseKey;
          });
          // Modify match with actual exercise key, to facilitate deleting form program
          const item = Object.assign({}, match, { key: exercise.key });
          return (
            <Card
              item={item}
              key={item.key}
              icon={'dumbbell'}
              info={this.state.info}
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
    const { screenIndex } = this.props.programStore;
    // if (loading) {
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <Text style={styles.loadingText}>SwoleMate</Text>
    //       <Text style={styles.loadingTextSub}>Loading...</Text>
    //       <ProgressBar width={200} indeterminate color={styles.$primaryColor} />
    //     </View>
    //   );
    // }

    if (this.state.loading) return null;

    let renderType;
    switch (screenIndex) {
      default:
        return null;
      case 'allPrograms':
        renderType = this.renderAllPrograms();
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        renderType = this.renderProgramDays();
        break;
      case 'programExercises':
        renderType = this.renderProgramExercises(this.props.programExercises);
        break;
      case 'addProgram':
        renderType = <Card addCard typeAddCard='addProgram' info={this.state.info} />;
        break;
      case 'addProgramDay':
        renderType = <Card addCard typeAddCard='addProgramDay' info={this.state.info} />;
        break;
      case 'addProgramExercise':
        renderType = (
          <Card
            addCard
            info={this.state.info}
            typeAddCard='addProgramExercise'
            allExercises={this.state.allExercises}
          />
        );
    }

    return (
      <Animatable.View>
        {renderType}
      </Animatable.View>
    );
  }
}

export default Programs;
