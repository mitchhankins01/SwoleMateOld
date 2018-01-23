import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import Picker from '../Components/Picker';
import Header from '../Components/Header';
import CountDown from '../Components/CountDown';
import * as Actions from '../Redux/Actions/Workout';
import ActionButton from '../Components/ActionButton';
import styles, { gradients } from './Styles/WorkoutStyles';

const getButtons = (goBack, onPressSave) => [
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
    onPress: () => onPressSave(),
    animation: 'zoomIn',
  },
];

const renderLog = (type, logs, exerciseKey, completedSets) => {
  let exerciseLogs = [];
  logs.forEach(logCollection =>
    logCollection.filter((log) => {
      if (log.exerciseKey === exerciseKey) {
        exerciseLogs = log;
      }
      return null;
    }));

  switch (type) {
    default:
      return null;
    case 'past':
      if (exerciseLogs.length === 0) return <Text style={styles.logText}>No Past Log</Text>;
      return (
        <ScrollView>
          {exerciseLogs.completedSets.map(each => (
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set}: ${each.weight}x${each.reps}`}
            </Text>
          ))}
        </ScrollView>
      );
    case 'current':
      if (completedSets.length === 0) return <Text style={styles.logText}>First Set</Text>;
      return (
        <ScrollView>
          {completedSets.map(each => (
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set + 1}: ${each.weight}x${each.reps}`}
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

class Workout extends Component {
  componentWillMount() {
    const { initWorkout, program: { dayKey, exercises } } = this.props;
    const exerciseList = () => exercises.filter(q => q.day === dayKey);
    initWorkout(exerciseList());
  }

  render() {
    const {
      goBack,
      setReps,
      workout,
      setWeight,
      onPressSave,
      workout: {
        input: { completedSets },
        exercise: {
          name, logs, initiated, exerciseKey, workoutComplete, showCountDown,
        },
      },
    } = this.props;
    if (workoutComplete) return <Text>Completed</Text>;
    if (!initiated) return null;

    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header noMenu title={name} />
        {/* Logs */}
        <View style={styles.logContainer} animation="mySlideInDown">
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Current Log</Text>
              {renderLog('current', logs, exerciseKey, completedSets)}
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleShowPastLogs(true)}>
              <Text style={styles.logTextHeader}>Past Log</Text>
              {renderLog('past', logs, exerciseKey, completedSets)}
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
        {showCountDown ? <CountDown /> : null}
        <ActionButton buttons={getButtons(goBack, onPressSave)} />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  program: state.program,
  workout: state.workout,
});

const mapDispatchToProps = dispatch => ({
  onPressSave: () => dispatch(Actions.onPressSave()),
  setReps: number => dispatch(Actions.setReps(number)),
  setWeight: number => dispatch(Actions.setWeight(number)),
  goBack: () => dispatch(NavigationActions.back('Programs')),
  initWorkout: (exercises, cb) => dispatch(Actions.initWorkout(exercises, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
