import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { fetchProgram, updateScreenIndex } from '../actions/program_actions';

class ActionBar extends Component {
  updateScreenIndex(screenIndex, goBack) {
    const { dispatch, navigation, styles } = this.props;

    dispatch(updateScreenIndex(screenIndex));

    if (goBack) { this.props.navigation.goBack(null); }
    if (screenIndex === 'primaryProgram') { dispatch(fetchProgram()); }

    switch (screenIndex) {
      default: break;
      case 'addProgram':
        navigation.navigate('Form', { title: 'Add new Program', styles });
        break;
      case 'addProgramDay':
        navigation.navigate('Form', { title: 'Add new Day', styles });
        break;
      case 'addProgramExercise':
        navigation.navigate('Form', { title: 'Add Exercise', styles });
    }
  }

  renderButton(styles, name, size, delay, onPress) {
    return (
      <Animatable.View
        delay={delay}
        duration={500}
        animation='zoomIn'
        style={{ alignSelf: 'center' }}
      >
        <Icon
          name={name}
          size={size}
          type='entypo'
          onPress={onPress}
          color={styles.$primaryColor}
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
        {this.renderButton(styles, 'trash', 20, 100)}
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
        {this.renderButton(styles, 'edit', 22, 200)}
        {this.renderButton(styles, 'help', 22, 100)}
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
        {this.renderButton(styles, 'trash', 20, 200)}
        {this.renderButton(styles, 'rocket', 25, 100)}
      </Animatable.View>
    );
  }

  renderFormActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300,
          () => this.updateScreenIndex('allPrograms', true)
        )}
        {this.renderButton(styles, 'help', 22, 200)}
        {this.renderButton(styles, 'check', 25, 100,
          this.props.onPressSave
        )}
      </Animatable.View>
    );
  }

  render() {
    const { styles, screenIndex } = this.props;

    let renderType;
    switch (screenIndex) {
      default:
        return;
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
        renderType = this.renderFormActionBar(styles);
    }

    return (
      <Animatable.View style={styles.actionBar} animation='zoomIn' duration={500}>
        {renderType}
      </Animatable.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenIndex: state.program.screenIndex,
  };
};

export default connect(mapStateToProps)(ActionBar);
