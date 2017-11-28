import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { updateScreenIndex } from '../actions/program_actions';

class ActionBar extends Component {
  updateScreenIndex(index) {
    const { dispatch } = this.props;
    dispatch(updateScreenIndex(index));
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

  renderPrimaryProgramActionBar(styles) {
    return (
      <View style={styles.actionBarView}>
        {this.renderButton(styles, 'list', 30, 400,
          () => this.updateScreenIndex('allPrograms')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 300)}
        {this.renderButton(styles, 'edit', 22, 200)}
        {this.renderButton(styles, 'help', 22, 100)}
      </View>
    );
  }

  renderAllProgramsActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView} >
        {this.renderButton(styles, 'back', 30, 300,
          () => this.updateScreenIndex('primaryProgram')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 200,
          () => this.updateScreenIndex('addNewProgram')
        )}
        {this.renderButton(styles, 'trash', 20, 100)}
      </Animatable.View>
    );
  }

  renderAllProgramsDetailsActionBar(styles) {
    return (
      <View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300,
          () => this.updateScreenIndex('allPrograms')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 200)}
        {this.renderButton(styles, 'trash', 20, 100)}
      </View>
    );
  }

  renderPrimaryProgramDetailsActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 400,
          () => this.updateScreenIndex('primaryProgram')
        )}
        {this.renderButton(styles, 'add-to-list', 30, 300)}
        {this.renderButton(styles, 'trash', 20, 200)}
        {this.renderButton(styles, 'rocket', 25, 100)}
      </Animatable.View>
    );
  }

  renderAddNewProgramActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300,
          () => this.props.navigation.goBack(null)
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
      case 'allProgramsDetails':
        renderType = this.renderAllProgramsDetailsActionBar(styles);
        break;
      case 'primaryProgram':
        renderType = this.renderPrimaryProgramActionBar(styles);
        break;
      case 'primaryProgramDetails':
        renderType = this.renderPrimaryProgramDetailsActionBar(styles);
        break;
      case 'addNewProgram':
        renderType = this.renderAddNewProgramActionBar(styles);
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
