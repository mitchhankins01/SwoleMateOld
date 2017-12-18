import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';

import { Overview } from './';
import themeStyles from './styles';
import { Picker } from '../../components/Picker';
import { ActionBar } from '../../components/ActionBar';
import { CountDown } from '../../components/CountDown';

@inject('themeStore', 'programStore', 'workoutStore') @observer
class Workout extends Component {
  state = {
    // Input
    reps: 10,
    weight: 10,
    // Various
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
      timePassed: 0,
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
    const { workoutStore:
      { clearTimer, clearCountDown, setWorkoutLog },
    } = this.props;

    clearTimer();
    clearCountDown();
    setWorkoutLog({});
  }

  showLastSetInfo(exerciseIndex) {
    this.dropdown.alertWithType(
      'info', 'Last set', `Up Next: ${this.getNextExerciseName(exerciseIndex).name}`
    );
  }

  onPressSave() {
    const {
      exerciseIndex,
      currentExercise: { sets },
      exerciseLog: { completedSets },
    } = this.state;

    // if on the second last or the exercise has only one set,
    // else if on the last set
    // else sets remaining

    if (completedSets.length === sets - 1) {
      this.saveSet(() => this.saveExercise());
    } else if (completedSets.length === sets - 2 || sets === 1) {
      this.showLastSetInfo(exerciseIndex);
      this.saveSet();
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
      reps: 10,
      weight: 10,
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
      exerciseSetIndex: 1,
      exerciseIndex: this.state.exerciseIndex + 1,
      exerciseLog: {
        exerciseKey: '',
        completedSets: [],
      },
      workoutLog: {
        timePassed: this.props.workoutStore.timePassed,
        completedExercises: updatedCompletedExercises,
      }
    }, () => {
      this.loadExercise();
    });
  }

  getNextExerciseName(exerciseIndex) {
    if (exerciseIndex + 1 === this.state.exerciseList.length) {
      return { name: 'End of Workout ' };
    }

    return (
      this.props.programStore.allExercises.find(query => {
        return query.key === this.state.exerciseList[exerciseIndex + 1].exerciseKey;
      })
    );
  }

  loadExercise() {
    const { exerciseIndex, exerciseList } = this.state;
    const { programStore: { allExercises } } = this.props;

    if (exerciseIndex >= exerciseList.length) {
      return this.setState({ workoutComplete: true });
    }

    // Create an array with all the program exercises
    const exercises = exerciseList.map(exercise => exercise);

    // Pull meta info off all exercises when compared to the current exercise,
    // and set the state with the exercise name
    const currentExerciseMeta = allExercises.find(query => {
      return query.key === exercises[exerciseIndex].exerciseKey;
    });

    // Set state with the current exercise name, rest, and the log with the exercisekey
    const exerciseKey = exercises[exerciseIndex].exerciseKey;
    this.setState({
      exerciseName: currentExerciseMeta.name,
      currentExercise: exercises[exerciseIndex],
      exerciseRest: exercises[exerciseIndex].rest,
      exerciseLog: { ...this.state.exerciseLog, exerciseKey },
    });
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

  renderLog(styles, type, completedSets) {
    if (type === 'current') {
      return (
        completedSets.map(each =>
          <Text key={each.set} style={styles.logTextSets}>
            {`Set ${each.set}: ${each.weight}x${each.reps}`}
          </Text>
        )
      );
    }
  }

  render() {
    const styles = themeStyles[this.props.themeStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];
    const {
      workoutLog,
      exerciseName,
      workoutComplete,
      exerciseLog: { completedSets }
    } = this.state;

    if (workoutComplete) {
      this.props.workoutStore.stopTimer();
      this.props.workoutStore.setWorkoutLog(workoutLog);
      this.props.workoutStore.addWorkoutLog(workoutLog);
      return <Overview gradients={gradients} navigation={this.props.navigation} />;
    }

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
            <Picker
              type='weight'
              weight={this.state.weight}
              setWeight={weight => this.setState({ weight })}
            />
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} duration={750} animation='zoomIn'>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput(styles, 'reps')}
            <Picker
              type='reps'
              reps={this.state.reps}
              setReps={reps => this.setState({ reps })}
            />
          </Animatable.View>
        </View>

        <ActionBar
          workout
          navigation={this.props.navigation}
          onPressSave={() => this.onPressSave()}
        />

        <DropdownAlert
          zIndex={5}
          translucent
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          titleStyle={styles.dropdownTitle}
          ref={ref => (this.dropdown = ref)}
          messageStyle={styles.dropdownMessage}
          closeInterval={this.state.currentExercise.rest * 1000}
        />

        {this.props.workoutStore.showCountDown ? <CountDown /> : null}

      </LinearGradient>
    );
  }
}

export default Workout;
