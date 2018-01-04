import { toJS } from 'mobx';
import { FlatList } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';

import { Card } from '../Card';

@inject('userStore', 'programStore') @observer
class Programs extends Component {
  // componentDidUpdate() {
  //   const { programCard } = this.refs;
  //
  //   if (programCard) {
  //     programCard.mySlider(750);
  //   }
  // }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { programStore: {
      updateScreenIndex, updateSelectedDayKey, fetchProgram, updateSelectedProgramKey
    } } = this.props;

    if (screenIndex) updateScreenIndex(screenIndex);
    if (selectedDayKey) updateSelectedDayKey(selectedDayKey);
    if (selectedProgram) {
      fetchProgram(null, selectedProgram);
      updateSelectedProgramKey(selectedProgram);
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
        onPress = () => {
          this.updateScreenIndex('programExercises', item.key);
          this.refs.programCard.mySlideInUp(750);
        };
        break;
      case 'programExercises':
        activeOpacity = 1;
        onPress = () => {};
        iconName = 'dumbbell';
        iconType = 'material-community';
        subtitle = `${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest`;
        break;
    }

    return { onPress, iconName, iconType, subtitle, activeOpacity };
  }

  render() {
    const {
      loading, showUpdateForm, screenIndex, allExercises, selectedDayKey
    } = this.props.programStore;
console.log(loading);
    if (loading) return null;
    if (showUpdateForm) return <Card updateCard />;
    if (screenIndex === 'addProgram' ||
        screenIndex === 'addProgramDay' ||
        screenIndex === 'addProgramExercise') {
      return <Card addCard />;
    }

    if (this.findData().length === 0 && !loading) {
      const title = screenIndex === 'allPrograms'
      ? 'Program' : 'Workout';
      return <Card emptyCard title={title} />;
    }
    if (screenIndex === 'programExercises') {
      const exercisesForThisDay = this.findData().filter(each => {
        return each.day === selectedDayKey;
      });
      if (exercisesForThisDay.length === 0) {
        return <Card emptyCard title='Exercise' />;
      }
    }

    return (
      <Animatable.View useNativeDriver ref='programCard' style={{ flex: 1 }}>
        <FlatList
          data={this.findData()}
          onScroll={({ nativeEvent: { contentOffset } }) => {
            if (!showUpdateForm) {
              this.props.programStore.scrollIndex = contentOffset.y;
            }
          }}
          renderItem={({ item }) => {
            let data;
            if (screenIndex === 'programExercises') {
              if (item.day === selectedDayKey) {
                const match = allExercises.find(eachExercise => {
                  return eachExercise.key === item.exerciseKey;
                });
                data = {
                  ...match,
                  key: item.key,
                  rest: item.rest,
                  reps: item.reps,
                  sets: item.sets,
                  index: item.index,
                };
              } else return null;
            } else if (screenIndex === 'allPrograms' && item.index === 0) {
              data = { ...item, name: `${item.name} (Default)` };
            } else {
              data = item;
            }

            return (
              <Card
                item={data}
                key={data.key}
                type={this.findContent(item).iconType}
                icon={this.findContent(item).iconName}
                onPress={this.findContent(item).onPress}
                subtitle={this.findContent(item).subtitle}
                activeOpacity={this.findContent(item).activeOpacity}
              />
            );
          }}
        />
      </Animatable.View>
    );
  }
}

export default Programs;
