import { View } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import DropdownAlert from 'react-native-dropdownalert';

import { Card } from '../Card';

@inject('userStore', 'programStore') @observer
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
    if (selectedDayKey) programStore.updateSelectedDayKey(selectedDayKey);
    if (selectedProgram) {
      programStore.fetchProgram(null, selectedProgram);
      programStore.updateSelectedProgramKey(selectedProgram);
    }
  }

  renderAllPrograms = () => {
    if (this.props.programStore.length === 0) return <Card empty title='Program' />;

    return (
      this.props.programStore.allPrograms.map(program => {
        return (
          <Card
            type='entypo'
            item={program}
            icon='clipboard'
            key={program.key}
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
            type='entypo'
            icon='folder'
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
              icon='dumbbell'
              info={this.state.info}
              type='material-community'
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
    const { loading, screenIndex } = this.props.programStore;
    // IMPLEMENT if loading, dropdown
    if (loading) return null;

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
      <View>
        {renderType}
        <DropdownAlert
          translucent
          closeInterval={2000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
        />
      </View>
    );
  }
}

export default Programs;
