import React from 'react';
import Color from 'color';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Styles/ActionButtonStyles';
import { Colors } from '../Themes';

const renderButton = (animation, icon, onPress) => (
  <Animatable.View animation={animation}>
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon iconStyle={styles.iconContainer} name={icon} type="entypo" />
    </TouchableOpacity>
  </Animatable.View>
);
// SCROLL INDEX
const ActionButton = ({ nav, program: { showExercises } }) => {
  // if (showUpdateForm || scrollIndex > 0) return null;

  switch (showExercises) {
    default:
      return null;
    case false:
      return (
        <View style={styles.actionView}>
          {renderButton('zoomIn', 'menu', () => nav.navigate('DrawerOpen'))}

          {renderButton('zoomIn', 'plus', () => updateScreenIndex('addProgramDay'))}
        </View>
      );
    case true:
      return (
        <View style={styles.actionView}>
          {renderButton('zoomIn', 'back', () => updateScreenIndex('selectedProgram'))}

          {renderButton('zoomIn', 'rocket', () => props.nav.navigate('Workout'))}

          {renderButton('zoomIn', 'plus', () => updateScreenIndex('addProgramExercise'))}
        </View>
      );
  }
};

const mapStateToProps = ({ nav, program }) => ({
  nav,
  program,
});

export default connect(mapStateToProps)(ActionButton);
