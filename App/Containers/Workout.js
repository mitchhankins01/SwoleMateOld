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
    icon: 'dumbbell',
    onPress: () => {},
    animation: 'zoomIn',
    type: 'material-community',
  },
  {
    icon: 'check',
    onPress: () => {},
    animation: 'zoomIn',
  },
];

const log = (type) => {
  const tempLogs = [];

  switch (type) {
    default:
      return null;
    case 'past':
      if (true) return <Text style={styles.logText}>No Past Log</Text>;
      return (
        <ScrollView>
          {tempLogs.completedSets.map(each => (
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set}: ${each.weight}x${each.reps}`}
            </Text>
          ))}
        </ScrollView>
      );
    case 'current':
      if (true) return <Text style={styles.logText}>First Set</Text>;
      return (
        <ScrollView>
          {tempLogs.map(each => (
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set}: ${each.weight}x${each.reps}`}
            </Text>
          ))}
        </ScrollView>
      );
  }
};

const renderTextInput = (workout, setReps, setWeight, type) => {
  const { input: { reps, weight } } = workout;
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

const exerciseList = (exercises, dayKey) => exercises.filter(q => q.day === dayKey);

const getExerciseList = (dayKey, exercises) => {
  exercises.filter(exercise => exercise.day === dayKey);
};

const Workout = ({
  goBack,
  setReps,
  setWeight,
  workout,
  getExercise,
  program: { dayKey, exercises },
}) => (
  <LinearGradient style={styles.container} colors={gradients}>
    {console.log(exerciseList(exercises, dayKey))}
    {/* {getExercise(1)} */}
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header noMenu title="Workout" />
    {/* Logs */}
    <View style={styles.logContainer} animation="mySlideInDown">
      <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.logTextHeader}>Current Log</Text>
          {log('current')}
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleShowPastLogs(true)}>
          <Text style={styles.logTextHeader}>Past Log</Text>
          {log('past')}
        </TouchableOpacity>
      </View>
    </View>
    {/* Inputs */}
    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
      <View style={styles.inputContainer} animation="mySlideInLeft" delay={250}>
        <Text style={styles.inputHeader}>Weight</Text>
        {renderTextInput(workout, setReps, setWeight, 'weight')}
        <Picker
          type="weight"
          weight={workout.input.weight}
          setWeight={number => setWeight(number)}
        />
      </View>
      <View style={styles.inputContainer} animation="mySlideInRight" delay={250}>
        <Text style={styles.inputHeader}>Reps</Text>
        {renderTextInput(workout, setReps, setWeight, 'reps')}
        <Picker type="reps" reps={workout.input.reps} setReps={number => setReps(number)} />
      </View>
    </View>
    <ActionButton buttons={getButtons(goBack)} />
  </LinearGradient>
);

const mapStateToProps = state => ({
  program: state.program,
  workout: state.workout,
});

const mapDispatchToProps = dispatch => ({
  setReps: number => dispatch(Actions.setReps(number)),
  setWeight: number => dispatch(Actions.setWeight(number)),
  getExercise: index => dispatch(Actions.getExercise(index)),
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
