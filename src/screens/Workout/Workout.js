import Color from 'color';
import { Wheel } from 'teaset';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, Text, TextInput, View } from 'react-native';

import themeStyles from './styles';
import { ActionBar } from '../../components/ActionBar';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

@inject('themeStore', 'programStore', 'workoutStore') @observer
class Workout extends Component {
  constructor(props) {
    super(props);
    this.numbers = [];
    for (let i = 0; i <= 100; ++i) this.numbers.push(i);
  }

  state = {
    // Input
    reps: 10,
    weight: 10,
    // Various]
    workoutComplete: false,
    // Current exercise
    exerciseList: [],
    exerciseIndex: 0,
    exerciseRest: 60,
    exerciseName: '',
    exerciseSetIndex: 1,
    currentExercise: [],
    // Logs
    exerciseLog: {
      exerciseKey: '',
      completedSets: [],
    },
    workoutLog: {
      timepassed: 0,
      completedExercises: [],
    },
  }

  componentWillMount() {
    const { programStore: { exercises, selectedDayKey } } = this.props;
    const exerciseList = exercises.filter(each => {
      return each.day === selectedDayKey;
    });
    this.setState({ exerciseList },
      () => this.loadExercise()
    );
  }

  componentDidMount() {
    this.props.workoutStore.startTimer();
  }

  componentWillUnmount() {
    this.props.workoutStore.clearTimer();
    this.props.workoutStore.clearCountDown();
  }

  onChangeInput(type, number) {
    switch (type) {
      default: return;
      case 'reps': return this.setState({ reps: number });
      case 'weight': return this.setState({ weight: number });
    }
  }

  onPressSave() {
    const {
      currentExercise: { sets },
      exerciseLog: { completedSets },
    } = this.state;

    // If on the last set, else sets remaining
    if (completedSets.length === sets - 1) {
      this.saveSet(() => this.saveExercise());
    } else {
      this.saveSet();
    }
  }

  saveSet(saveExercise) {
    const {
      reps,
      weight,
      exerciseSetIndex,
      currentExercise: { rest },
      exerciseLog: { completedSets },
    } = this.state;
    const { workoutStore: {
      setCountDown,
      startCountDown,
    } } = this.props;
    // Set and start countDown
    setCountDown(rest);
    startCountDown(true);

    // Create a new array and set it equal to the completedSets in state
    const updatedCompletedSets = completedSets;
    updatedCompletedSets.push({ set: exerciseSetIndex, reps, weight });
    this.setState({
      exerciseSetIndex: exerciseSetIndex + 1,
      exerciseLog: {
        completedSets: updatedCompletedSets,
        exerciseKey: this.state.exerciseLog.exerciseKey,
      }
    }, () => {
      if (saveExercise) saveExercise();
    });
  }

  saveExercise() {
    const {
      workoutLog: { completedExercises },
    } = this.state;

    // Create a new array and set it equal to the completedExercises in state
    // Clear out old exerciseLog for new exercise
    const updatedCompletedExercises = completedExercises;
    updatedCompletedExercises.push(this.state.exerciseLog);
    this.setState({
      exerciseIndex: this.state.exerciseIndex + 1,
      exerciseSetIndex: 1,
      exerciseLog: {
        exerciseKey: '',
        completedSets: [],
      },
      workoutLog: {
        timepassed: this.props.workoutStore.timePassed,
        completedExercises: updatedCompletedExercises,
      }
    }, () => {
      this.loadExercise();
    });
  }

  loadExercise() {
    const { exerciseIndex, exerciseList } = this.state;
    const { programStore: { allExercises } } = this.props;

    if (exerciseIndex >= exerciseList.length) return this.setState({ workoutComplete: true });

    // Create an array with all the program exercises
    const exercises = exerciseList.map(exercise => exercise);

    // Pull meta info off all exercises when compared to the current exercise,
    // and set the state with the exercise name
    const exercisesMeta = allExercises.find(query => {
      return query.key === exercises[exerciseIndex].exerciseKey;
    });

    // Set state with the current exercise name, rest, and the log with the exercisekey
    const exerciseKey = exercises[exerciseIndex].exerciseKey;
    this.setState({
      exerciseName: exercisesMeta.name,
      currentExercise: exercises[exerciseIndex],
      exerciseRest: exercises[exerciseIndex].rest,
      exerciseLog: { ...this.state.exerciseLog, exerciseKey },
    });
  }

  renderCountDown(styles) {
    const bgColor = Color(styles.$tertiaryColor).alpha(0.7);

    return (
      <View style={[styles.countDownContainer, { backgroundColor: bgColor }]}>
        <Text style={styles.countDownText}>
          {this.props.workoutStore.countDown}
        </Text>
        <Progress.CircleSnail
          thickness={7}
          indeterminate
          size={DEVICE_WIDTH * 0.7}
          color={styles.$primaryColor}
        />
      </View>
    );
  }

  renderTextInput(styles, type) {
    const { weight, reps } = this.state;
    return (
    <TextInput
      keyboardType='numeric'
      style={styles.spinnerText}
      enablesReturnKeyAutomatically
      clearButtonMode='while-editing'
      underlineColorAndroid='transparent'
      onChangeText={number => this.onChangeInput(type, number)}
      value={type === 'weight' ? weight.toString() : reps.toString()}
    />
    );
  }

  renderWheel(styles, type) {
    return (
      <Wheel
        holeLine={0}
        items={this.numbers}
        maskStyle={{ backgroundColor: 'transparent' }}
        onChange={number => this.onChangeInput(type, number)}
        style={{ height: 200, marginTop: 10, backgroundColor: 'transparent' }}
        index={type === 'weight' ? Number(this.state.weight) : Number(this.state.reps)}
        itemStyle={{ textAlign: 'center', color: '#EDF0F1', fontFamily: 'Exo-Medium' }}
        holeStyle={{ borderColor: styles.$primaryColor, borderTopWidth: 1, borderBottomWidth: 1 }}
      />
    );
  }

  renderLog(styles, type, completedSets) {
    if (type === 'current') {
      return (
        completedSets.map(each =>
          <Text key={each.set} style={styles.logTextSets}>
            {`${each.set}: ${each.weight}x${each.reps}`}
          </Text>
        )
      );
    }
  }

  render() {
    const styles = themeStyles[this.props.themeStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];
    const { workoutComplete, exerciseName, exerciseLog: { completedSets } } = this.state;

    if (workoutComplete) console.log(this.state.workoutLog);

    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Animatable.View style={styles.headerContainer} duration={750} animation='zoomIn'>
          <Text style={styles.headerText}>{exerciseName}</Text>
        </Animatable.View>

        <Animatable.View style={styles.logContainer} duration={750} animation='zoomIn'>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }} >
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Current Log</Text>
              {this.renderLog(styles, 'current', completedSets)}
            </View>
            <View style={styles.divider} />
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Past Log</Text>
            </View>
          </View>
        </Animatable.View>

        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <Animatable.View style={styles.inputContainer} duration={750} animation='zoomIn'>
            <Text style={styles.inputHeader}>Weight</Text>
            {this.renderTextInput(styles, 'weight')}
            {this.renderWheel(styles, 'weight')}
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} duration={750} animation='zoomIn'>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput(styles, 'reps')}
            {this.renderWheel(styles, 'reps')}
          </Animatable.View>
        </View>
        <ActionBar
          workout
          onPressSave={() => this.onPressSave()}
          navigation={this.props.navigation}
          timePassed={this.props.workoutStore.timePassed}
        />
        {this.props.workoutStore.showCountDown ? this.renderCountDown(styles) : null}
      </LinearGradient>
    );
  }
}

export default Workout;
