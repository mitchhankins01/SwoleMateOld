import _ from 'lodash';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

import Alert from '../Components/Alert';
import { ThemeSelector } from '../Themes';
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
    initWorkout(exerciseList());
  }

  componentWillReceiveProps(nextProps) {
    const {
      workout: { input: { setIndex }, exercise: { sets, showCountDown } },
    } = nextProps;
    if (sets - 1 === setIndex && !showCountDown) {
      this.setState({ showLastSetAlert: true });
    }
  }

  componentWillUnmount() {
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
      theme, setReps, setWeight, workout: { input: { reps, weight } },
    } = this.props;
    const Colors = ThemeSelector(theme);
    return (
      <TextInput
        keyboardType="numeric"
        style={[styles.textInput, { borderColor: Colors.primaryColor }]}
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
    return (
      <Alert
        message=""
        acknowledge
        title="Last Set!"
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
    const { theme, changeExercise, workout: { exercise: { exerciseList } } } = this.props;
    const Colors = ThemeSelector(theme);
    
    const update = (index) => {
      changeExercise(index);
      this.toggleExerciseList();
    };
    return (
      <View style={[styles.exerciseListContainer, { backgroundColor: Colors.secondaryColor }]}>
        <Text style={[styles.exerciseListHeader, { color: Colors.text }]}>
          Exercise List
        </Text>
        <FlatList
          data={exerciseList}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.exerciseListButton} onPress={() => update(index)}>
              <Text style={[styles.exerciseListText, { color: Colors.text }]}>
                {`${index + 1}. ${item.name}`}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Icon
          name="close"
          underlayColor="transparent"
          onPress={() => this.toggleExerciseList()}
          iconStyle={[styles.overlayIcon, { color: Colors.primaryColor }]}
          containerStyle={[
            styles.overlayButtonContainer,
            { borderColor: Colors.primaryColor, shadowColor: Colors.primaryColor },
          ]}
        />
      </View>
    );
  }

  renderPastLogs() {
    const { theme, workout: { exercise: { logs, exerciseKey } } } = this.props;
    const Colors = ThemeSelector(theme);

    const filteredLogs = [];
    logs.forEach(logCollection =>
      logCollection.forEach((log) => {
        if (log.exerciseKey === exerciseKey) {
          filteredLogs.push({ completed: log.completed, sets: log.completedSets });
        }
      }));

    return (
      <View style={[styles.pastLogsContainer, { backgroundColor: Colors.secondaryColor }]}>
        <Text style={[styles.pastLogsHeader, { color: Colors.text }]}>Past Logs</Text>
        <FlatList
          data={filteredLogs}
          style={styles.pastLogsFlatList}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Text key={index} style={[styles.pastLogsText, { color: Colors.text }]}>
              {`${item.completed}\n`}
              {item.sets.map(({ set, weight, reps }) => (
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
          onPress={() => this.togglePastLogs()}
          iconStyle={[styles.overlayIcon, { color: Colors.primaryColor }]}
          containerStyle={[
            styles.overlayButtonContainer,
            { borderColor: Colors.primaryColor, shadowColor: Colors.primaryColor },
          ]}
        />
      </View>
    );
  }

  renderLogOverview(type) {
    const { theme, workout: { input: { performed }, exercise: { logs, exerciseKey } } } = this.props;
    const Colors = ThemeSelector(theme);
    
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
            <Text style={[styles.logText, { color: Colors.text }]}>No Past Log</Text>
          );
        }
        return (
          <ScrollView>
            {Object.keys(pastPerformed).map((key) => {
              const each = pastPerformed[key];
              return (
                <Text key={each.set} style={[styles.logTextSets, { color: Colors.text }]}>
                  {`Set ${each.set}: ${each.weight}x${each.reps}`}
                </Text>
              );
            })}
          </ScrollView>
        );
      case 'current':
        if (!performed[exerciseKey]) return <Text style={[styles.logText, { color: Colors.text }]}>First Set</Text>;
        return (
          <ScrollView>
            {Object.keys(performed[exerciseKey]).map((key) => {
              const each = performed[exerciseKey][key];
              return (
                <Text key={each.set} style={[styles.logTextSets, { color: Colors.text }]}>
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
      theme,
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
    const Colors = ThemeSelector(theme);
    const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];
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
          performed: { ...value }, exerciseKey: key, logKey: userLogsRef.id,
        });
      });
      return <WorkoutOverview performed={this.props.workout.input.performed} duration={duration} goBack={goBack} />;
    }

    if (!initiated) return <Loading />;

    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header noMenu title={name} />
        {/* Logs */}
        <View
          style={[
            styles.logContainer,
            { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
          ]}
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
            style={[
              styles.inputContainer,
              { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
            ]}
          >
            <Text style={[styles.inputHeader, { color: Colors.text }]}>Weight</Text>
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
            style={[
              styles.inputContainer,
              { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
            ]}
          >
            <Text style={[styles.inputHeader, { color: Colors.text }]}>Reps</Text>
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

Workout.propTypes = {
  program: PropTypes.any.isRequired,
  goBack: PropTypes.func.isRequired,
  workout: PropTypes.any.isRequired,
  setReps: PropTypes.func.isRequired,
  setWeight: PropTypes.func.isRequired,
  onPressSave: PropTypes.func.isRequired,
  initWorkout: PropTypes.func.isRequired,
  destroyWorkout: PropTypes.func.isRequired,
  changeExercise: PropTypes.func.isRequired,
};

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
