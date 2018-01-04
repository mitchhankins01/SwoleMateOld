import React from 'react';
import Color from 'color';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, View, Text } from 'react-native';

import themeStyles from './styles';

export default inject('programStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const backgroundColor = Color(styles.$tertiaryColor).alpha(0.8);
  const {
    screenIndex,
    scrollIndex,
    showUpdateForm,
    updateScreenIndex,
    showActionOptions,
    toggleShowActionOptions,
  } = props.programStore;

  if (showUpdateForm || scrollIndex > 0) return null;

  if (showActionOptions) {
    let delay = 0;
    return (
      <View style={styles.optionsView}>
        {actionButtonOptions(props).map(option => {
          delay += 100;
          return (
            <Animatable.View animation='mySlideInUp' delay={delay} duration={500} key={option.title}>
              <TouchableOpacity style={styles.optionsButton} onPress={option.onPress}>
                <Icon iconStyle={styles.optionsIcon} name={option.iconName} type={option.iconType} />
                <Text style={styles.optionsText}>{option.title}</Text>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    );
  }

  switch (screenIndex) {
    default: return null;
    case 'allPrograms':
    case 'primaryProgram':
    case 'selectedProgram':
      return (
        <View style={[styles.actionView, { backgroundColor, justifyContent: 'flex-end' }]}>
          <Animatable.View animation='mySlideInRightBoring'>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => toggleShowActionOptions(true)}
            >
              <Icon iconStyle={styles.iconContainer} name='dots-three-vertical' type='entypo' />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      );
    case 'programExercises':
      return (
        <View style={[styles.actionView, { backgroundColor }]}>
          <Animatable.View animation='mySlideInLeftBoring'>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => updateScreenIndex('selectedProgram')}
            >
              <Icon iconStyle={styles.iconContainer} name='back' type='entypo' />
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation='mySlideInUpBoring'>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.navigation.navigate('Workout')}
            >
              <Icon iconStyle={[styles.iconContainer, { fontSize: 27 }]} name='rocket' type='entypo' />
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation='mySlideInRightBoring'>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => toggleShowActionOptions(true)}
            >
              <Icon iconStyle={styles.iconContainer} name='dots-three-vertical' type='entypo' />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      );
  }
}));

const actionButtonOptions = (props) => {
  const {
    screenIndex,
    updateScreenIndex,
    toggleShowActionOptions,
  } = props.programStore;

  const allPrograms = [
    {
      title: 'Main Menu',
      iconName: 'menu',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        props.navigation.navigate('DrawerOpen');
      }
    },
    {
      title: 'Add Program',
      iconName: 'add-to-list',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('addProgram');
      }
    },
    {
      title: 'Default Program',
      iconName: 'folder',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('primaryProgram');
      }
    },
    {
      title: 'Close',
      iconName: 'cross',
      iconType: 'entypo',
      onPress: () => toggleShowActionOptions(false)
    },
  ];

  const programDays = [
    {
      title: 'Main Menu',
      iconName: 'menu',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        props.navigation.navigate('DrawerOpen');
      }
    },
    {
      title: 'Add Workout',
      iconName: 'add-to-list',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('addProgramDay');
      }
    },
    {
      title: 'All Programs',
      iconName: 'clipboard',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('allPrograms');
      }
    },
    {
      title: 'Close',
      iconName: 'cross',
      iconType: 'entypo',
      onPress: () => toggleShowActionOptions(false)
    },
  ];

  const programExercises = [
    {
      title: 'Main Menu',
      iconName: 'menu',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        props.navigation.navigate('DrawerOpen');
      }
    },
    {
      title: 'Add Exercise',
      iconName: 'add-to-list',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('addProgramExercise');
      }
    },
    {
      title: 'Back to Program',
      iconName: 'folder',
      iconType: 'entypo',
      onPress: () => {
        toggleShowActionOptions(false);
        updateScreenIndex('primaryProgram');
      }
    },
    {
      title: 'Close',
      iconName: 'cross',
      iconType: 'entypo',
      onPress: () => toggleShowActionOptions(false)
    },
  ];

  switch (screenIndex) {
    default: return null;
    case 'allPrograms': return allPrograms;
    case 'primaryProgram':
    case 'selectedProgram': return programDays;
    case 'programExercises': return programExercises;
  }
};
