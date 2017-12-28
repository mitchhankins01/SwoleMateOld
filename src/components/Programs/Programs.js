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
    const { screenIndex } = this.props.programStore;

    let onPress;
    let iconName;
    let iconType;
    let subtitle;
    let activeOpacity;

    switch (screenIndex) {
      default: return [];
      case 'allPrograms':
        activeOpacity = 0.2;
        iconType = 'entypo';
        iconName = 'clipboard';
        subtitle = `${item.frequency} Days - ${item.level} - ${item.type}`;
        onPress = () => this.updateScreenIndex('selectedProgram', null, item.key);
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        activeOpacity = 0.2;
        iconType = 'entypo';
        iconName = 'folder';
        subtitle = `${item.primaryGroup} - ${item.secondaryGroup}`;
        onPress = () => this.updateScreenIndex('programExercises', item.key);
        break;
      case 'programExercises':
        activeOpacity = 1;
        onPress = () => {};
        iconName = 'dumbbell';
        iconType = 'material-community';
        subtitle = `${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest`;
        break;
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

    return { onPress, iconName, iconType, subtitle, activeOpacity };
  }

  render() {
    const { loading, showUpdateForm, screenIndex, allExercises } = this.props.programStore;

    if (loading) return null;
    if (showUpdateForm) {
      return (
        <Card updateCard />
      );
    }

    return (
      <FlatList
        data={this.findData()}
        onScroll={event => {
          console.log(event);
          if (!this.props.programStore.showUpdateForm) {
            this.props.programStore.scrollIndex = event.nativeEvent.contentOffset.y;
          }
        }}
        renderItem={({ item }) => {
          let data;
          if (screenIndex === 'programExercises') {
            const match = allExercises.find(eachExercise => {
              return eachExercise.key === item.exerciseKey;
            });

            data = { ...match, key: item.key, index: item.index };
          } else {
            data = item;
          }

          return (
            <Card
              item={data}
              key={data.key}
              info={this.state.info}
              type={this.findContent(item).iconType}
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
