import React from 'react';
import Color from 'color';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

const renderButton = (styles, animation, icon, onPress) => {
  return (
    <Animatable.View animation={animation}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress} >
        <Icon iconStyle={styles.iconContainer} name={icon} type='entypo' />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default inject('programStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const backgroundColor = Color(styles.$tertiaryColor).alpha(0.8);
  const {
    screenIndex,
    scrollIndex,
    showUpdateForm,
    updateScreenIndex,
  } = props.programStore;

  if (showUpdateForm || scrollIndex > 0) return null;

  switch (screenIndex) {
    default: return null;
    case 'allPrograms':
      return (
        <View style={[styles.actionView, { backgroundColor }]}>
          {renderButton(styles, 'mySlideInLeftBoring', 'menu',
            () => props.navigation.navigate('DrawerOpen'))}

          {renderButton(styles, 'mySlideInRightBoring', 'plus',
            () => updateScreenIndex('addProgram'))}
        </View>
      );
    case 'primaryProgram':
    case 'selectedProgram':
      return (
        <View style={[styles.actionView, { backgroundColor }]}>
          {renderButton(styles, 'mySlideInLeftBoring', 'menu',
            () => props.navigation.navigate('DrawerOpen'))}

          {renderButton(styles, 'mySlideInRightBoring', 'plus',
            () => updateScreenIndex('addProgramDay'))}
        </View>
      );
    case 'programExercises':
      return (
        <View style={[styles.actionView, { backgroundColor }]}>
          {renderButton(styles, 'mySlideInLeftBoring', 'back',
            () => updateScreenIndex('selectedProgram'))}

          {renderButton(styles, 'mySlideInUpBoring', 'rocket',
            () => props.navigation.navigate('Workout'))}

          {renderButton(styles, 'mySlideInRightBoring', 'plus',
            () => updateScreenIndex('addProgramExercise'))}
        </View>
      );
  }
}));
