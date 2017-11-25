import React, { Component } from 'react';
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
        duration={1250}
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
      <Animatable.View animation='zoomIn' duration={1250} style={styles.actionBar} >
        {this.renderButton(styles, 'back', 30, 750, this.props.onPressShowPrimaryProgram)}
        {this.renderButton(styles, 'add-to-list', 30, 500, this.props.onPressAddNewProgram)}
        {this.renderButton(styles, 'trash', 20, 250)}
      </Animatable.View>
    );
  }

  renderPrimaryProgramActionBar(styles) {
    return (
      <Animatable.View animation='zoomIn' duration={1250} style={styles.actionBar} >
        {this.renderButton(styles, 'list', 30, 1000, this.props.onPressShowAllPrograms)}
        {this.renderButton(styles, 'add-to-list', 30, 750)}
        {this.renderButton(styles, 'edit', 22, 500)}
        {this.renderButton(styles, 'help', 22, 250)}
      </Animatable.View>
    );
  }

  renderPrimaryProgramDetailsActionBar(styles) {
    return (
      <Animatable.View animation='zoomIn' duration={1250} style={styles.actionBar} >
        {this.renderButton(styles, 'back', 30, 750, this.props.onPressBackToPrimaryProgram)}
        {this.renderButton(styles, 'add-to-list', 30, 500)}
        {this.renderButton(styles, 'trash', 20, 250)}
      </Animatable.View>
    );
  }

  renderAddNewProgramActionBar(styles) {
    return (
      <Animatable.View animation='zoomIn' duration={1250} style={styles.actionBar} >
        {this.renderButton(styles, 'back', 30, 750, () => this.props.navigation.goBack(null))}
        {this.renderButton(styles, 'help', 22, 500)}
        {this.renderButton(styles, 'check', 25, 250, this.props.onPressSave)}
      </Animatable.View>
    );
  }

  render() {
    const { styles, actionBarType } = this.props;

    switch (actionBarType) {
      default:
        return;
      case 'allPrograms':
        return this.renderAllProgramsActionBar(styles);
      case 'primaryProgram':
        return this.renderPrimaryProgramActionBar(styles);
      case 'primaryProgramDetails':
        return this.renderPrimaryProgramDetailsActionBar(styles);
      case 'addNewProgram':
        return this.renderAddNewProgramActionBar(styles);
    }
  }
}

export default ActionBar;
