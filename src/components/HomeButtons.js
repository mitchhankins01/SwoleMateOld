import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderButton(styles, name, size, delay) {
    return (
      <Animatable.View
        animation='zoomIn'
        duration={1250}
        delay={delay}
        style={{ alignSelf: 'center' }}
      >
        <Icon
          name={name}
          size={size}
          type='entypo'
          color={styles.$primaryColor}
        />
      </Animatable.View>
    );
  }

  render() {
    const styles = this.props.styles;

    return (
      <Animatable.View
        animation='zoomIn'
        duration={1250}
        delay={0}
        style={{
          backgroundColor: styles.$secondaryColor,
          borderRadius: 10,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {this.renderButton(styles, 'list', 30, 1000)}
        {this.renderButton(styles, 'add-to-list', 30, 750)}
        {this.renderButton(styles, 'edit', 22, 500)}
        {this.renderButton(styles, 'help', 22, 250)}
      </Animatable.View>
    );
  }
}

export default HomeButtons;

// const buttons = ['Hello', 'World', 'Buttons'];
//
// return (
//   <ButtonGroup
//     onPress={() => {}}
//     selectedIndex={9}
//     buttons={buttons}
//     selectedBackgroundColor={'transparent'}
//     textStyle={{ color: styles.$primaryColor }}
//     innerBorderStyle={{ color: styles.$primaryColor }}
//     containerStyle={{
//       position: 'absolute',
//       backgroundColor: styles.$secondaryColor,
//       borderColor: styles.$primaryColor,
//       bottom: 15,
//       left: 10,
//       right: 10,
//       height: 40
//     }}
//   />
// );
