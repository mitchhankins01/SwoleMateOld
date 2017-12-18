import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import { View, Text } from 'react-native';

import themeStyles from './styles';


@inject('themeStore', 'programStore', 'workoutStore') @observer
class ActionBar extends Component {
  updateScreenIndex(screenIndex, goBack) {
    const { programStore, navigation } = this.props;

    programStore.updateScreenIndex(screenIndex);

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
        <Text style={styles.workoutBarText}>
          {new Date(this.props.workoutStore.timePassed * 1000).toISOString().substr(12, 7)}
        </Text>
        {this.renderButton(styles, 'check', 25, 100,
          this.props.onPressSave
        )}
      </Animatable.View>
    );
  }

  render() {
    const { workout } = this.props;
    const { screenIndex } = this.props.programStore;
    const styles = themeStyles[this.props.themeStore.selected];

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

export default ActionBar;
