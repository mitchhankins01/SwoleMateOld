import React from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

export default inject('programStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const {
    screenIndex,
    showUpdateForm,
    updateScreenIndex,
    showActionOptions,
    toggleShowActionOptions,
  } = props.programStore;

  if (showUpdateForm) return null;

  if (showActionOptions) {
    return (
      <View style={styles.optionsView}>
        {props.programStore.actionButtonOptions().map(option => {
          return (
            <TouchableOpacity style={styles.optionsButton} onPress={option.onPress} key={option.title}>
              <Icon iconStyle={styles.optionsIcon} name={option.iconName} type={option.iconType} />
              <Text style={styles.optionsText}>{option.title}</Text>
            </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => toggleShowActionOptions(true)}
        >
          <Icon iconStyle={styles.iconContainer} name='dots-three-vertical' type='entypo' />
        </TouchableOpacity>
      );
    case 'programExercises':
      return (
        <View style={{ justifyContent: 'space-between', height: 50, flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => toggleShowActionOptions(true)}
          >
            <Icon iconStyle={styles.iconContainer} name='dots-three-vertical' type='entypo' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => props.navigation.navigate('Workout')}
          >
            <Icon iconStyle={[styles.iconContainer, { fontSize: 27 }]} name='rocket' type='entypo' />
          </TouchableOpacity>
        </View>
      );
  }
}));
