import { View, ListView, FlatList } from 'react-native';
import { toJS } from 'mobx';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';

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
    showAnimation: false,
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
      <FlatList
        data={toJS(this.props.programStore.allPrograms)}
        renderItem={({ item }) => {
          return (
            <Card
              type='entypo'
              item={item}
              icon='clipboard'
              key={item.key}
              activeOpacity={0.2}
              subtitle={`${item.frequency} Days - ${item.level} - ${item.type}`}
              onPress={() => this.updateScreenIndex('selectedProgram', null, item.key)}
            />
          );
        }}
      />
    );
  }

  renderProgramDays = () => {
    if (this.props.programStore.days.length === 0) return <Card empty title='Workout' />;

    return (
      <FlatList
        data={toJS(this.props.programStore.days)}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
              type='entypo'
              icon='folder'
              key={item.key}
              activeOpacity={0.2}
              info={this.state.info}
              subtitle={`${item.primaryGroup} - ${item.secondaryGroup}`}
              onPress={() => this.updateScreenIndex('programExercises', item.key)}
            />
          );
        }}
      />
    );
  }

  renderProgramExercises = () => {
    const { exercises, selectedDayKey, allExercises } = this.props.programStore;

    return (
      <FlatList
        data={toJS(exercises)}
        renderItem={({ item }) => {
          if (item.day === selectedDayKey) {
            const match = allExercises.find(eachExercise => {
              return eachExercise.key === item.exerciseKey;
            });
            const exercise = Object.assign({}, match, { key: item.key });

            return (
              <Card
                item={exercise}
                key={exercise.key}
                icon='dumbbell'
                activeOpacity={1}
                info={this.state.info}
                type='material-community'
                subtitle={`${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest`}
              />
            );
          }
          return null;
        }}
      />
    );
  }

  componentWillUpdate() {
    if (this.refs.programCard) {
      this.refs.programCard.mySlider();
    }
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
      <Animatable.View
        useNativeDriver
        ref='programCard'
        animation='mySlider'
        duration={this.state.showAnimation ? 750 : 1}
        onAnimationEnd={() => this.setState({ showAnimation: true })}
      >
        {renderType}
        <DropdownAlert
          translucent
          closeInterval={2000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
        />
      </Animatable.View>
    );
  }
}

export default Programs;
