import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import { Constants, Colors } from '../Themes';
import styles from './Styles/CountDownStyles';

const CountDown = ({ rest, showCountDown }) => {
  if (!showCountDown) return null;
  return (
    <View style={styles.countDownContainer}>
      <Animatable.View style={styles.progressContainer} animation="zoomIn">
        <Text style={styles.countDownText}>{rest}</Text>
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
          onPress={() => {
            toggleLastSetInfo(false);
            toggleShowCountDown(false);
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ workout: { exercise } }) => exercise;

const mapDispatchToProps = dispatch => ({
  // onPressSave: () => dispatch(Actions.onPressSave()),
  // setReps: number => dispatch(Actions.setReps(number)),
  // setWeight: number => dispatch(Actions.setWeight(number)),
  // goBack: () => dispatch(NavigationActions.back('Programs')),
  // initWorkout: (exercises, cb) => dispatch(Actions.initWorkout(exercises, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
