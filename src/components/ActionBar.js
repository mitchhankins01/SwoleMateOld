import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        {this.renderButton(styles, 'list', 30, 400, this.props.onPressShowAllPrograms)}
        {this.renderButton(styles, 'add-to-list', 30, 300)}
        {this.renderButton(styles, 'edit', 22, 200)}
        {this.renderButton(styles, 'help', 22, 100)}
      </View>
    );
  }

  renderAllProgramsActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView} >
        {this.renderButton(styles, 'back', 30, 300, this.props.onPressShowPrimaryProgram)}
        {this.renderButton(styles, 'add-to-list', 30, 200, this.props.onPressAddNewProgram)}
        {this.renderButton(styles, 'trash', 20, 100)}
      </Animatable.View>
    );
  }

  renderPrimaryProgramDetailsActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300, this.props.onPressBackToPrimaryProgram)}
        {this.renderButton(styles, 'add-to-list', 30, 200)}
        {this.renderButton(styles, 'trash', 20, 100)}
      </Animatable.View>
    );
  }

  renderAddNewProgramActionBar(styles) {
    return (
      <Animatable.View style={styles.actionBarView}>
        {this.renderButton(styles, 'back', 30, 300, () => this.props.navigation.goBack(null))}
        {this.renderButton(styles, 'help', 22, 200)}
        {this.renderButton(styles, 'check', 25, 100, this.props.onPressSave)}
      </Animatable.View>
    );
  }

  render() {
    const { styles, actionBarType } = this.props;

    let renderType;
    switch (actionBarType) {
      default:
        return;
      case 'allPrograms':
        renderType = this.renderAllProgramsActionBar(styles);
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

export default ActionBar;
