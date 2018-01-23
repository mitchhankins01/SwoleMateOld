import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { AppState, AsyncStorage, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import { Constants, Colors } from '../Themes';
import styles from './Styles/CountDownStyles';
import { HIDE_COUNTDOWN } from '../Redux/Types/Workout';

class CountDown extends Component {
  state = {
    timeRemaining: this.props.rest,
    appState: AppState.currentState,
  };

  componentDidMount() {
    this.countDownId = setInterval(() => {
      if (this.state.timeRemaining <= 0) {
        clearInterval(this.countDownId);
        this.props.onPressClose();
      } else {
        this.setState({ timeRemaining: this.state.timeRemaining - 1 });
      }
    }, 1000);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.countDownId);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState) => {
    if (nextAppState !== 'active') {
      await AsyncStorage.setItem('inactiveAt', new Date().getTime().toString());
    } else {
      const inactiveAt = await AsyncStorage.getItem('inactiveAt');
      if (inactiveAt !== null) {
        const differenceinMS = Math.abs(new Date().getTime() - inactiveAt);
        const differenceInSec = Math.floor(differenceinMS / 1000);
        this.setState({ timeRemaining: this.state.timeRemaining - differenceInSec });
      }
    }
  };

  render() {
    const { timeRemaining } = this.state;
    return (
      <View style={styles.countDownContainer}>
        <Animatable.View style={styles.progressContainer} animation="zoomIn">
          <Text style={styles.countDownText}>{timeRemaining > 0 ? timeRemaining : 0}</Text>
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

CountDown.propTypes = {
  rest: PropTypes.number.isRequired,
  onPressClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ workout: { exercise } }) => exercise;

const mapDispatchToProps = dispatch => ({
  onPressClose: () => dispatch({ type: HIDE_COUNTDOWN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
