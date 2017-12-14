import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { Dimensions, View, Text } from 'react-native';
import themeStyles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

@inject('workoutStore', 'themeStore') @observer
class CountDown extends Component {
  renderLastSetView(styles) {
    const { workoutStore: { countDown, showCountDown } } = this.props;

    if (countDown <= 0 || !showCountDown) return null;

    return (
      <Animatable.View style={[{ backgroundColor: 'transparent', zIndex: 1 }]} animation='zoomIn'>
        <Text style={styles.lastSetViewText}>
          Up Next:
        </Text>
        <Text style={styles.lastSetViewText}>
          {`\n${this.props.upcomingExercise}`}
        </Text>
      </Animatable.View>
    );
  }

  render() {
    const styles = themeStyles[this.props.themeStore.selected];
    const { workoutStore: { countDown, toggleShowCountDown } } = this.props;

    if (this.props.showLastSetView) return this.renderLastSetView(styles);

    return (
      <View style={styles.countDownContainer}>
        <Animatable.View style={styles.countDownContainerAnimated} animation='zoomIn'>
          <Text style={styles.countDownText}>
            {countDown}
          </Text>
          <Progress.CircleSnail
            indeterminate
            thickness={20}
            size={DEVICE_WIDTH * 0.7}
            color={styles.$primaryColor}
          />
          <Icon
            size={50}
            name='close'
            iconStyle={styles.countDownIcon}
            onPress={() => toggleShowCountDown(false)}
          />
        </Animatable.View>
      </View>
    );
  }
}

export default CountDown;
