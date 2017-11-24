import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Color from 'color';

class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderButton(styles, name, iconSize) {
    const size = iconSize || 30;

    return (
      <Button
        icon={{
          name, size, type: 'entypo', color: styles.$primaryColor
        }}
        //buttonStyle={{ backgroundColor: 'transparent' }}
        containerViewStyle={{ justifyContent: 'center' }}
      />
    );
  }

  render() {
    const styles = this.props.styles;

    return (
      <View
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
        {this.renderButton(styles, 'list')}
        {this.renderButton(styles, 'add-to-list')}
        {this.renderButton(styles, 'edit', 22)}
        {this.renderButton(styles, 'help', 22)}
      </View>
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
