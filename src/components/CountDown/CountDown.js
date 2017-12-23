import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { Dimensions, View, Text } from 'react-native';
import themeStyles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

@inject('workoutStore', 'userStore') @observer
class CountDown extends Component {
  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const { workoutStore: { countDown, toggleShowCountDown, toggleLastSetInfo } } = this.props;

    return (
      <View style={styles.countDownContainer}>
        <Animatable.View style={styles.countDownContainerAnimated} animation='zoomIn'>
          <Text style={styles.countDownText}>
            {countDown}
          </Text>
          <View style={{ marginTop: 125 }}>
            <Progress.CircleSnail
              indeterminate
              thickness={20}
              size={DEVICE_WIDTH * 0.7}
              color={styles.$primaryColor}
            />
          </View>
          <Icon
            size={50}
            name='close'
            iconStyle={{ color: styles.$primaryColor, marginTop: 75 }}
            onPress={() => {
              toggleLastSetInfo(false);
              toggleShowCountDown(false);
            }}
          />
        </Animatable.View>
      </View>
    );
  }
}

export default CountDown;
