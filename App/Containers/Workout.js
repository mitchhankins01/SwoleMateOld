import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Picker from '../Components/Picker';
import { Colors, Fonts } from '../Themes';
import Header from '../Components/Header';
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

const setReps = (number) => {
  // set reps
};

const setWeight = (number) => {
  // set weight
};

const renderTextInput = (type) => {
  // const { reps, weight } = this.props.workoutStore;
  const reps = 0;
  const weight = 0;
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

const Workout = ({ goBack }) => (
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
        {renderTextInput('weight')}
        <Picker type="weight" weight={0} setWeight={change => setWeight(change)} />
      </View>
      <View style={styles.inputContainer} animation="mySlideInRight" delay={250}>
        <Text style={styles.inputHeader}>Reps</Text>
        {renderTextInput('repsInput')}
        <Picker type="reps" reps={0} setReps={change => setReps(change)} />
      </View>
    </View>
    <ActionButton buttons={getButtons(goBack)} />
  </LinearGradient>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
