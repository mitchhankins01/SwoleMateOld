import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Picker from '../Components/Picker';
import { Colors, Fonts } from '../Themes';
import Header from '../Components/Header';
import * as Actions from '../Redux/Actions/Workout';
import ActionButton from '../Components/ActionButton';
import styles, { gradients, textColor } from './Styles/WorkoutStyles';

const getButtons = goBack => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
  {
    icon: 'check',
    animation: 'zoomIn',
    onPress: () => {},
  },
];

const renderTextInput = (workout, setReps, setWeight, type) => {
  const { reps, weight } = workout;
  return (
    <TextInput
      keyboardType="numeric"
      style={styles.textInput}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      value={type === 'weight' ? weight.toString() : reps.toString()}
      onFocus={() => {
        if (type === 'reps') return setReps('');
        if (type === 'weight') return setWeight('');
      }}
      onChangeText={(number) => {
        if (type === 'reps') return setReps(number);
        if (type === 'weight') return setWeight(number);
      }}
    />
  );
};

const Workout = ({
  goBack, setReps, setWeight, workout,
}) => (
  <LinearGradient style={styles.container} colors={gradients}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header noMenu title="Workout" />
    {/* Logs */}
    <View style={styles.logContainer} animation="mySlideInDown">
      <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.logTextHeader}>Current Log</Text>
          {/* {this.renderLog(styles, 'current')} */}
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleShowPastLogs(true)}>
          <Text style={styles.logTextHeader}>Past Log</Text>
          {/* {this.renderLog(styles, 'past')} */}
        </TouchableOpacity>
      </View>
    </View>
    {/* Inputs */}
    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
      <View style={styles.inputContainer} animation="mySlideInLeft" delay={250}>
        <Text style={styles.inputHeader}>Weight</Text>
        {renderTextInput(workout, setReps, setWeight, 'weight')}
        <Picker type="weight" weight={workout.weight} setWeight={number => setWeight(number)} />
      </View>
      <View style={styles.inputContainer} animation="mySlideInRight" delay={250}>
        <Text style={styles.inputHeader}>Reps</Text>
        {renderTextInput(workout, setReps, setWeight, 'reps')}
        <Picker type="reps" reps={workout.reps} setReps={number => setReps(number)} />
      </View>
    </View>
    <ActionButton buttons={getButtons(goBack)} />
  </LinearGradient>
);

const mapStateToProps = state => ({
  workout: state.workout,
});

const mapDispatchToProps = dispatch => ({
  setReps: number => dispatch(Actions.setReps(number)),
  setWeight: number => dispatch(Actions.setWeight(number)),
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
