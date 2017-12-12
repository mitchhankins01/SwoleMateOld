import { Wheel } from 'teaset';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';
import { ActionBar } from '../../components/ActionBar';

@inject('themeStore', 'programStore') @observer
class Workout extends Component {
  constructor(props) {
    super(props);
    this.numbers = [];
    for (let i = 0; i <= 100; ++i) this.numbers.push(i);
  }

  state = {
    reps: 10,
    weight: 10,
    timePassed: 0,
    exerciseList: [],

    // Current exercise
    exerciseIndex: 0,
    exerciseSetIndex: 1,
    exerciseRest: 60,
    exerciseName: '',
    currentExercise: [],
    workoutLog: {
      timepassed: 0,
      completedExercises: [],
    },
    exerciseLog: {
      exerciseKey: '',
      completedSets: [],
    }
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
    //IMPLEMENT, move counter to programStore mobx
    this.timePassed = setInterval(() => {
      this.setState({ timePassed: this.state.timePassed + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timePassed);
  }

  saveSet(saveExercise) {
    const {
      reps,
      weight,
      exerciseSetIndex,
      exerciseLog: { completedSets },
    } = this.state;

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
        timepassed: this.state.timePassed,
        completedExercises: updatedCompletedExercises,
      }
    }, () => {
      this.loadExercise();
    });
  }

  onPressSave() {
    const {
      currentExercise: { sets },
      exerciseLog: { completedSets },
    } = this.state;

    // If on the last set, else if sets remaining, else no more sets
    if (completedSets.length === sets - 1) {
      this.saveSet(() => this.saveExercise());
    } else {
      this.saveSet();
    }
  }

  loadExercise() {
    const { exerciseIndex, exerciseList } = this.state;
    const { programStore: { allExercises } } = this.props;

    if (exerciseIndex >= exerciseList.length) return console.log('end workout');

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

  onChangeInput(type, number) {
    switch (type) {
      default: return;
      case 'reps': return this.setState({ reps: number });
      case 'weight': return this.setState({ weight: number });
    }
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
  render() {
    const styles = themeStyles[this.props.themeStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Animatable.View style={styles.headerContainer} duration={750} animation='zoomIn'>
          <Text style={styles.headerText}>{this.state.exerciseName}</Text>
        </Animatable.View>
        <Animatable.View style={styles.logContainer} duration={750} animation='zoomIn'>
          <Text style={[styles.headerText, { fontSize: 18 }]}>Past Logs</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }} >
            <Text> </Text>
            <View style={styles.divider} />
            <Text> </Text>
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
          timePassed={this.state.timePassed}
        />
      </LinearGradient>
    );
  }
}

export default Workout;
