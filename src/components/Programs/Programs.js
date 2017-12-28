import { toJS } from 'mobx';
import { FlatList } from 'react-native';
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

  componentWillUpdate() {
    if (this.refs.programCard) {
      this.refs.programCard.mySlider(750);
    }
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
    if (this.props.programStore.allPrograms.length === 0) return <Card empty title='Program' />;

    return (
      <FlatList
        data={toJS(this.props.programStore.allPrograms)}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
              type='entypo'
              key={item.key}
              icon='clipboard'
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
            const exercise = Object.assign({}, match, { key: item.key, index: item.index });

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

  findData() {
    const { screenIndex, allPrograms, days, exercises } = this.props.programStore;

    switch (screenIndex) {
      default: return [];
      case 'allPrograms':
        return toJS(allPrograms);
      case 'primaryProgram':
      case 'selectedProgram':
        return toJS(days);
      case 'programExercises':
        return toJS(exercises);
      }
  }

  findContent(item) {
    const { screenIndex, days, exercises } = this.props.programStore;

    let onPress;
    let iconName;
    let subtitle;
    let activeOpacity;

    switch (screenIndex) {
      default: return [];
      case 'allPrograms':
        activeOpacity = 0.2;
        iconName = 'clipboard';
        subtitle = `${item.frequency} Days - ${item.level} - ${item.type}`;
        onPress = () => this.updateScreenIndex('selectedProgram', null, item.key);
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        activeOpacity = 0.2;
        iconName = 'folder';
        subtitle = `${item.primaryGroup} - ${item.secondaryGroup}`;
        onPress = () => this.updateScreenIndex('programExercises', item.key);
        break;
      case 'programExercises':
        return toJS(exercises);
      case 'addProgram':
        return (
          <Animatable.View useNativeDriver ref='programCard'>
            <Card addCard typeAddCard='addProgram' info={this.state.info} />
            <DropdownAlert
              translucent
              closeInterval={2000}
              updateStatusBar={false}
              ref={ref => (this.dropdown = ref)}
            />
          </Animatable.View>
        );
      case 'addProgramDay':
        return (
          <Animatable.View useNativeDriver ref='programCard'>
            <Card addCard typeAddCard='addProgramDay' info={this.state.info} />
            <DropdownAlert
              translucent
              closeInterval={2000}
              updateStatusBar={false}
              ref={ref => (this.dropdown = ref)}
            />
          </Animatable.View>
        );
      case 'addProgramExercise':
        return (
          <Animatable.View useNativeDriver ref='programCard'>
            <Card
              addCard
              info={this.state.info}
              typeAddCard='addProgramExercise'
            />
            <DropdownAlert
              translucent
              closeInterval={2000}
              updateStatusBar={false}
              ref={ref => (this.dropdown = ref)}
            />
          </Animatable.View>
        );
    }

    return { onPress, iconName, subtitle, activeOpacity };
  }

  render() {
    const { loading, showUpdateForm } = this.props.programStore;

    if (loading) return null;
    if (showUpdateForm) {
      return (
        <Card updateCard />
      );
    }

    return (
      <FlatList
        data={this.findData()}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
              type='entypo'
              info={this.state.info}
              key={item.key}
              icon={this.findContent(item).iconName}
              onPress={this.findContent(item).onPress}
              subtitle={this.findContent(item).subtitle}
              activeOpacity={this.findContent(item).activeOpacity}
            />
          );
        }}
      />
    );
  }
}

export default Programs;
