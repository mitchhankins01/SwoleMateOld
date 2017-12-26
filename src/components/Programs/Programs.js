import { View, ListView } from 'react-native';
import { toJS } from 'mobx';
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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    if (this.props.programStore.length === 0) return <Card empty title='Program' />;

    return (
      <ListView
        style={{ width: '100%' }}
        dataSource={ds.cloneWithRows(toJS(this.props.programStore.allPrograms))}
        renderRow={rowData => {
          return (
            <Card
              type='entypo'
              icon='clipboard'
              activeOpacity={0.2}
              item={rowData.program}
              key={rowData.program.key}
              subtitle={`${rowData.program.frequency} Days - ${rowData.program.level} - ${rowData.program.type}`}
              onPress={() => this.updateScreenIndex('selectedProgram', null, rowData.program.key)}
            />
          );
        }}
      />
    );
  }

  renderProgramDays = () => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    if (this.props.programStore.days.length === 0) return <Card empty title='Workout' />;

    return (
      <ListView
        style={{ width: '100%', backgroundColor: 'red' }}
        dataSource={ds.cloneWithRows(toJS(this.props.programStore.days))}
        renderRow={day => {
          return (
            <Card
              type='entypo'
              icon='folder'
              activeOpacity={0.2}
              item={day}
              info={this.state.info}
              key={day.key}
              subtitle={`${day.primaryGroup} - ${day.secondaryGroup}`}
              onPress={() => this.updateScreenIndex('programExercises', day.key)}
            />
          );
        }}
      />
    );
  }

  renderProgramExercises = () => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
              activeOpacity={1}
              info={this.state.info}
              type='material-community'
              subtitle={`${exercise.sets} Sets - ${exercise.reps} Reps - ${exercise.rest}s Rest`}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { loading, screenIndex, showUpdateForm } = this.props.programStore;

    if (loading) return null;

    let renderType;
    if (showUpdateForm) {
       renderType = <Card updateCard />;
    } else {
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
