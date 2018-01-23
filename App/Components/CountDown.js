import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import { Constants, Colors } from '../Themes';
import styles from './Styles/CountDownStyles';
import { HIDE_COUNTDOWN } from '../Redux/Types/Workout';

class CountDown extends Component {
  state = { timeRemaining: this.props.rest };

  componentDidMount() {
    let timeRemaining = this.props.rest;
    this.countDownId = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(this.countDownId);
        this.props.onPressClose();
      } else {
        timeRemaining -= 1;
        this.setState({ timeRemaining });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countDownId);
  }

  render() {
    return (
      <View style={styles.countDownContainer}>
        <Animatable.View style={styles.progressContainer} animation="zoomIn">
          <Text style={styles.countDownText}>{this.state.timeRemaining}</Text>
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
            onPress={() => this.props.onPressClose()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ workout: { exercise } }) => exercise;

const mapDispatchToProps = dispatch => ({
  onPressClose: () => dispatch({ type: HIDE_COUNTDOWN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
