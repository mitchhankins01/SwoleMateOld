import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
 import { Dimensions, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';
import {
  updateScreenIndex,
} from '../../actions/programActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

Animatable.initializeRegistryWithDefinitions({
  myFancyAnimation: {
    from: {
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
    to: {
      translateX: DEVICE_WIDTH,
      translateY: -DEVICE_HEIGHT / 0.6,
      scale: 10,
    },
  }
});

class ActionBar extends Component {
  updateScreenIndex(screenIndex, goBack) {
    const { dispatch, navigation } = this.props;

    dispatch(updateScreenIndex(screenIndex));

    if (goBack) navigation.goBack(null);
    //if (screenIndex === 'primaryProgram') dispatch(fetchProgram());
  }

  handleRocket() {
    return this.props.navigation.navigate('Workout');

    if (this.refs.rocketButton) {
      this.refs.rocketButton.myFancyAnimation(6000);
    }
    setTimeout(() => {
      this.props.navigation.navigate('Workout');
    }, 2000);
  }

  renderButton(styles, name, size, delay, onPress, ref) {
    return (
      <Animatable.View
        ref={ref}
        delay={delay}
        duration={500}
        animation='zoomIn'
        style={{ alignSelf: 'center' }}
      >
        <Icon
          name={name}
          size={size}
          type='entypo'
          color={'#EDF0F1'}
          onPress={onPress}
          iconStyle={{ padding: 15 }}
          underlayColor={'transparent'}
        />
      </Animatable.View>
    );
  }

  renderAllProgramsActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView} >
        {this.renderButton(styles, 'back', 30, 300,
          () => this.updateScreenIndex('primaryProgram')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 200,
          () => this.updateScreenIndex('addProgram')
        )}
        {this.renderButton(styles, 'help', 20, 100)}
      </Animatable.View>
    );
  }

  renderProgramActionBar(styles) {
    return (
      <View style={styles.actionBarView}>
        {this.renderButton(styles, 'list', 30, 400,
          () => this.updateScreenIndex('allPrograms')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 300,
          () => this.updateScreenIndex('addProgramDay')
        )}
        {this.renderButton(styles, 'help', 22, 100,
          () => console.log(this.props.programDays)
        )}
      </View>
    );
  }

  renderProgramExercisesActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 400,
          () => this.updateScreenIndex('selectedProgram')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 300,
          () => this.updateScreenIndex('addProgramExercise')
        )}
        {this.renderButton(styles, 'rocket', 25, 100, () => this.handleRocket(), 'rocketButton')}
      </Animatable.View>
    );
  }

  renderFormActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300,
          () => this.updateScreenIndex('primaryProgram', true)
        )}
        {this.renderButton(styles, 'help', 22, 200)}
        {this.renderButton(styles, 'check', 25, 100,
          this.props.onPressSave
        )}
      </Animatable.View>
    );
  }

  renderWorkoutActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarWorkout}>
        {this.renderButton(styles, 'back', 30, 300,
          () => this.props.navigation.goBack(null)
        )}
        <Text style={styles.workoutBarText}> 0:00 </Text>
        {this.renderButton(styles, 'check', 25, 100,
          this.props.onPressSave
        )}
      </Animatable.View>
    );
  }

  render() {
    const { theme, screenIndex, workout } = this.props;
    const styles = themeStyles[theme];

    if (workout) return renderType = this.renderWorkoutActionBar(styles);

    let renderType;
    switch (screenIndex) {
      default:
        return null;
      case 'allPrograms':
        renderType = this.renderAllProgramsActionBar(styles);
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        renderType = this.renderProgramActionBar(styles);
        break;
      case 'programExercises':
        renderType = this.renderProgramExercisesActionBar(styles);
        break;
      case 'addProgram':
      case 'addProgramDay':
      case 'addProgramExercise':
        return null; //renderType = this.renderFormActionBar(styles);
    }


    if (this.props.scrollIndex <= 0) {
      return (
        <Animatable.View style={styles.actionBar} animation='slideInUp' duration={500}>
          {renderType}
        </Animatable.View>
      );
    }
    return (
      <Animatable.View style={styles.actionBar} animation='slideOutDown' duration={500}>
        {renderType}
      </Animatable.View>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    theme: theme.selected,
    screenIndex: program.screenIndex,
    //
    // //Debugging
    // programInfo: program.info,
    // programDays: program.days,
  };
};

export default connect(mapStateToProps)(ActionBar);
