import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
// import BackgroundTimer from 'react-native-background-timer';

import { Constants, Colors } from '../Themes';
import styles from './Styles/CountDownStyles';
import { HIDE_COUNTDOWN } from '../Redux/Types/Workout';

const CountDown = ({ rest, showCountDown, onPressClose }) => {
  if (!showCountDown) return null;
  let timeRemaining = rest;
  BackgroundTimer.setInterval(() => {
    if (this.countDown <= 0) {
      // BackgroundTimer.clearInterval(this.countDownID);
      // this.showCountDown = false;
    } else {
      timeRemaining -= 1;
    }
  }, 1000);
  return (
    <View style={styles.countDownContainer}>
      <Animatable.View style={styles.progressContainer} animation="zoomIn">
        <Text style={styles.countDownText}>{timeRemaining}</Text>
        <View>
          <Progress.CircleSnail
            indeterminate
            thickness={20}
            color={Colors.primaryColor}
            size={Constants.DEV_WIDTH * 0.7}
          />
        </View>
      </Animatable.View>
      <View style={styles.buttonContainerView}>
        <Icon
          size={50}
          name="close"
          underlayColor="transparent"
          iconStyle={styles.countDownIcon}
          containerStyle={styles.buttonContainer}
          onPress={() => onPressClose()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ workout: { exercise } }) => exercise;

const mapDispatchToProps = dispatch => ({
  onPressClose: () => dispatch({ type: HIDE_COUNTDOWN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
