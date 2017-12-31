import React from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

const handlePress = ({ programStore: { updateScreenIndex } }, index) => {

};

const renderOption = (styles, name, type, title, onPress) => {
  return (
    <TouchableOpacity style={styles.optionsButton} onPress={onPress}>
      <Icon iconStyle={styles.optionsIcon} name={name} type={type} />
      <Text style={styles.optionsText}>{title}</Text>
    </TouchableOpacity>
  );
};

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
        {renderOption(styles, 'add-to-list', 'entypo', 'Add new Workout', () => {
          toggleShowActionOptions(false);
          updateScreenIndex('addProgramDay');
        })}
        {renderOption(styles, 'list', 'entypo', 'All Programs', () => {
          toggleShowActionOptions(false);
          updateScreenIndex('allPrograms');
        })}
        {renderOption(styles, 'back', 'entypo', 'Close', () => toggleShowActionOptions(false))}
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
        <TouchableOpacity
          onPress={() => updateScreenIndex('primaryProgram')}
          style={[styles.buttonContainer, { alignSelf: 'flex-start' }]}
        >
          <Icon iconStyle={styles.iconContainer} name='back' type='entypo' />
        </TouchableOpacity>
      );
  }
}));
