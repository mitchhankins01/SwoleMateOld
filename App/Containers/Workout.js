/* eslint react/prop-types: 0 */
import _ from 'lodash';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import Alert from '../Components/Alert';
import Picker from '../Components/Picker';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import styles from './Styles/WorkoutStyles';
import CountDown from '../Components/CountDown';
import * as Actions from '../Redux/Actions/Workout';
import ActionButton from '../Components/ActionButton';
import WorkoutOverview from '../Components/WorkoutOverview';

const getButtons = (goBack, toggleExerciseList, onPressSave) => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
  {
    icon: 'dumbbell',
    onPress: () => toggleExerciseList(),
    animation: 'zoomIn',
    type: 'material-community',
  },
  {
    icon: 'check',
    onPress: () => onPressSave(),
    animation: 'zoomIn',
  },
];

class Workout extends Component {
  state = { showCloseAlert: false, showPastLogs: false, showExerciseList: false, showLastSetAlert: false, };

  componentWillMount() {
    const { initWorkout, program: { dayKey, exercises } } = this.props;
    const exerciseList = () => exercises.filter(q => q.day === dayKey);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({ showCloseAlert: true });
      return true;
    });
    initWorkout(exerciseList());
  }

  componentWillReceiveProps(nextProps) {
    const {
      workout: { input: { setIndex, reps, weight }, exercise: { sets, showCountDown } },
    } = nextProps;
    const repsDiffers = reps !== this.props.workout.input.reps;
    const weightDiffers = weight !== this.props.workout.input.weight;
    if (repsDiffers || weightDiffers) return;
    if (sets - 1 === setIndex && !showCountDown) {
      if (sets === 1) return;
      this.setState({ showLastSetAlert: true });
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.props.destroyWorkout();
  }

  togglePastLogs() {
    this.setState({ showPastLogs: !this.state.showPastLogs });
  }

  toggleExerciseList() {
    this.setState({ showExerciseList: !this.state.showExerciseList });
  }

  renderTextInput(type) {
    const {
      setReps, setWeight, workout: { input: { reps, weight } },
    } = this.props;
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
  }

  renderLastSetAlert() {
    const { exerciseIndex, exerciseList } = this.props.workout.exercise;
    if (exerciseIndex === exerciseList.length) return null;
    if (exerciseList[exerciseIndex] && exerciseList[exerciseIndex].sets === 1) return null;
    return (
      <Alert
        acknowledge
        title="Last Set!"
        message="Prepare for the next exercise"
        onPressSave={() => this.setState({ showLastSetAlert: false })}
      />
    );
  }

  renderCloseAlert() {
    return (
      <Alert
        title="Are You Sure?"
        message="Your workout will not be saved"
        onPressSave={() => this.props.goBack()}
        onPressClose={() => this.setState({ showCloseAlert: false })}
      />
    );
  }

  renderExerciselist() {
    const { changeExercise, workout: { exercise: { exerciseList } } } = this.props;
    
    const update = (index) => {
      changeExercise(index);
      this.toggleExerciseList();
    };
    return (
      <View style={styles.exerciseListContainer}>
        <Text style={styles.exerciseListHeader}>
          Exercise List
        </Text>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.exerciseListButton} onPress={() => update(index)}>
              <Text style={styles.exerciseListText}>
                {`${index + 1}. ${item.name}`}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Icon
          name="close"
          underlayColor="transparent"
          onPress={() => this.toggleExerciseList()}
          iconStyle={styles.overlayIcon}
          containerStyle={styles.overlayButtonContainer}
        />
      </View>
    );
  }

  renderPastLogs() {
    const { workout: { exercise: { logs, exerciseKey } } } = this.props;

    const filteredLogs = [];
    logs.forEach(logCollection =>
      logCollection.forEach((log) => {
        if (log.exerciseKey === exerciseKey) {
          const performed = Object.values(log.performed).map(({ set, reps, weight }) => ({ set, reps, weight }));
          filteredLogs.push({ completed: log.completed, performed });
        }
      }));

    return (
      <View style={styles.pastLogsContainer}>
        <Text style={styles.pastLogsHeader}>Past Logs</Text>
        <FlatList
          data={filteredLogs}
          style={styles.pastLogsFlatList}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Text key={index} style={styles.pastLogsText}>
              {`${item.completed}\n`}
              {item.performed.map(({ set, weight, reps }) => (
                <Text key={set} style={styles.pastLogsText}>
                  {`Set ${set}: ${weight}x${reps}\n`}
                </Text>
              ))}
            </Text>
          )}
        />
        <Icon
          name="close"
          underlayColor="transparent"
          iconStyle={styles.overlayIcon}
          onPress={() => this.togglePastLogs()}
          containerStyle={styles.overlayButtonContainer}
        />
      </View>
    );
  }

  renderLogOverview(type) {
    const { workout: { input: { performed }, exercise: { logs, exerciseKey } } } = this.props;
    
    let pastPerformed;
    logs.forEach(logCollection => logCollection.forEach((log) => {
      if (log.exerciseKey === exerciseKey) pastPerformed = log.performed;
    }));

    switch (type) {
      default:
        return null;
      case 'past':
        if (!pastPerformed) {
          return (
            <Text style={styles.logText}>No Past Log</Text>
          );
        }
        return (
          <ScrollView>
            {Object.keys(pastPerformed).map((key) => {
              const each = pastPerformed[key];
              return (
                <Text key={each.set} style={styles.logTextSets}>
                  {`Set ${each.set}: ${each.weight}x${each.reps}`}
                </Text>
              );
            })}
          </ScrollView>
        );
      case 'current':
        if (!performed[exerciseKey]) return <Text style={styles.logText}>First Set</Text>;
        return (
          <ScrollView>
            {Object.keys(performed[exerciseKey]).map((key) => {
              const each = performed[exerciseKey][key];
              return (
                <Text key={each.set} style={styles.logTextSets}>
                  {`Set ${each.set + 1}: ${each.weight}x${each.reps}`}
                </Text>
              );
            })}
          </ScrollView>
        );
    }
  }

  render() {
    const {
      goBack,
      setReps,
      workout,
      setWeight,
      onPressSave,
      workout: {
        exercise: {
          name, initiated, workoutComplete, showCountDown,
        },
      },
    } = this.props;
    const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
    const { showPastLogs, showCloseAlert, showExerciseList, showLastSetAlert } = this.state;

    if (workoutComplete) {
      const duration = new Date().getTime() - this.props.workout.input.startedAt.getTime();
      const userLogsRef = firebase.firestore().collection('userLogs').doc();
      userLogsRef.set({
        duration,
        type: 'workout',
        author: firebase.auth().currentUser.uid,
        completed: new Date().toISOString().substr(0, 10),
      });
      _.mapKeys(this.props.workout.input.performed, (value, key) => {
        userLogsRef.collection('exercises').add({
          exerciseKey: key,
          logKey: userLogsRef.id,
          performed: { ...value },
          completed: new Date().toISOString().substr(0, 10),
        });
      });
      return <WorkoutOverview performed={this.props.workout.input.performed} duration={duration} goBack={goBack} />;
    }

    if (!initiated) return <Loading />;

    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        {/* <Header noMenu title={name} /> */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{name}</Text>
        </View>
        {/* Logs */}
        <View
          style={styles.logContainer}
          animation="mySlideInDown"
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Current Log</Text>
              {this.renderLogOverview('current')}
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.togglePastLogs()}>
              <Text style={styles.logTextHeader}>Past Log</Text>
              {this.renderLogOverview('past')}
            </TouchableOpacity>
          </View>
        </View>
        {/* Inputs */}
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <View
            delay={250}
            animation="mySlideInLeft"
            style={styles.inputContainer}
          >
            <Text style={styles.inputHeader}>Weight</Text>
            {this.renderTextInput('weight')}
            <Picker
              type="weight"
              weight={workout.input.weight}
              setWeight={number => setWeight(number)}
            />
          </View>
          <View
            delay={250}
            animation="mySlideInRight"
            style={styles.inputContainer}
          >
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput('reps')}
            <Picker type="reps" reps={workout.input.reps} setReps={number => setReps(number)} />
          </View>
        </View>
        <ActionButton
          buttons={getButtons(
            () => this.setState({ showCloseAlert: true }),
            () => this.toggleExerciseList(),
            onPressSave,
          )}
        />
        {showCountDown ? <CountDown /> : null}
        {showPastLogs ? this.renderPastLogs() : null}
        {showCloseAlert ? this.renderCloseAlert() : null}
        {showExerciseList ? this.renderExerciselist() : null}
        {showLastSetAlert ? this.renderLastSetAlert() : null}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  program: state.program,
  workout: state.workout,
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => ({
  onPressSave: () => dispatch(Actions.onPressSave()),
  setReps: number => dispatch(Actions.setReps(number)),
  setWeight: number => dispatch(Actions.setWeight(number)),
  destroyWorkout: () => dispatch(Actions.destroyWorkout()),
  goBack: () => dispatch(NavigationActions.back('Programs')),
  changeExercise: index => dispatch(Actions.changeExercise(index)),
  initWorkout: exercises => dispatch(Actions.initWorkout(exercises)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
