import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon } from 'react-native-elements';

import { Fonts, Constants } from '../Themes';

const styles = EStyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    elevation: 2,
    // alignItems: 'center',
    position: 'absolute',
    // justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    fontSize: 30,
    color: '$primaryColor',
    fontFamily: Fonts.type.medium,
  },
  slide: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Constants.DEV_WIDTH,
  },
  button: {
    left: 20,
    right: 20,
    height: 50,
    bottom: 30,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    borderColor: '$primaryColor',
  },
  buttonText: {
    color: '$primaryColor',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
  },
  icon: {
    fontSize: 60,
    color: '$primaryColor',
    marginTop: 40,
  },
});

const SLIDE_DATA = [
  { text: 'Welcome to SwoleMate, swipe right to begin', icon: 'arrow-right' },
  { text: 'To add a workout day, use the add button in the bottom right corner', icon: 'plus' },
  { text: 'After selecting a workout, you can add exercises to it', icon: 'plus' },
  { text: 'To start your workout, just tap the launch button', icon: 'rocket' },
];

export default class Onboarding extends Component {
  state = { visible: true };

  renderButton(bool) {
    if (!bool) return null;
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.setState({ visible: false })}>
        <Text style={styles.buttonText}>Let us Lift</Text>
      </TouchableOpacity>
    );
  }

  render() {
    if (!this.state.visible) return null;
    return (
      <ScrollView horizontal style={styles.container} pagingEnabled>
        {SLIDE_DATA.map((slide, index) => (
          <View key={slide.text} style={[styles.slide, {}]}>
            <Text style={styles.text}>{slide.text}</Text>
            <Icon type="entypo" name={slide.icon} iconStyle={styles.icon} />
            {this.renderButton(index === SLIDE_DATA.length - 1)}
          </View>
        ))}
      </ScrollView>
    );
  }
}
