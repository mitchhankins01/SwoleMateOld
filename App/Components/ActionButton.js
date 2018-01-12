import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Styles/ActionButtonStyles';
import * as Actions from '../Redux/Actions/Program';

const renderButton = (animation, icon, onPress) => (
  <Animatable.View animation={animation}>
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon iconStyle={styles.iconContainer} name={icon} type="entypo" />
    </TouchableOpacity>
  </Animatable.View>
);

const ActionButton = ({
  nav, toggleExercises, toggleDrawer, program: { showExercises },
}) => {
  // if (showUpdateForm || scrollIndex > 0) return null;

  if (!showExercises) {
    return (
      <View style={styles.actionView}>
        {renderButton('zoomIn', 'menu', () => toggleDrawer())}

        {renderButton('zoomIn', 'plus', () => updateScreenIndex('addProgramDay'))}
      </View>
    );
  }

  return (
    <View style={styles.actionView}>
      {renderButton('zoomIn', 'back', () => toggleExercises(false))}

      {renderButton('zoomIn', 'rocket', () => props.nav.navigate('Workout'))}

      {renderButton('zoomIn', 'plus', () => updateScreenIndex('addProgramExercise'))}
    </View>
  );
};

const mapStateToProps = ({ nav, program }) => ({
  nav,
  program,
});

const mapDispatchToProps = dispatch => ({
  toggleExercises: bool => dispatch(Actions.toggleExercises(bool)),
  toggleDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerToggle' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
