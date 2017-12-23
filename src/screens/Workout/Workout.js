import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import { BackHandler, Text, TextInput, View } from 'react-native';

import {toJS} from 'mobx';

import { Overview } from './';
import themeStyles from './styles';
import { Picker } from '../../components/Picker';
import { ActionBar } from '../../components/ActionBar';
import { CountDown } from '../../components/CountDown';

@inject('userStore', 'programStore', 'workoutStore', 'logStore') @observer
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
    const {
      workoutStore: { initWorkout },
      programStore: { exercises, selectedDayKey, allExercises }
    } = this.props;

    initWorkout(exercises, selectedDayKey, allExercises);
  }

  componentDidMount() {
    // Implement, move to Main?
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.routeName === 'Workout') {
        this.renderCloseAlert();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.props.workoutStore.terminateWorkout();
    this.backHandler.remove();
  }

  renderCloseAlert() {
    this.dropdownExit.alertWithType('info', 'Exit', 'Tap this close button to exit');
  }

  showLastSetInfo(exerciseIndex) {
    this.dropdown.alertWithType(
      'info', 'Last set', `Up Next: ${this.getNextExerciseName(exerciseIndex).name}`
    );
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

  renderTextInput(styles, type) {
    const { reps, weight, setReps, setWeight } = this.props.workoutStore;

    return (
    <TextInput
      keyboardType='numeric'
      style={styles.spinnerText}
      enablesReturnKeyAutomatically
      clearButtonMode='while-editing'
      underlineColorAndroid='transparent'
      value={type === 'weight' ? weight.toString() : reps.toString()}
      onChangeText={number => {
        if (type === 'reps') return setReps(number);
        if (type === 'weight') return setWeight(number);
      }}
    />
    );
  }

  renderLog(styles, type) {
    const { completedSets } = this.props.workoutStore.exerciseLog;
    const fetchedLog = toJS(this.props.workoutStore.fetchedLog);
 return //console.log(typeof fetchedLog.completedSets)
    if (type === 'current') {
      if (completedSets.length === 0) {
        return (
          <Text style={styles.logTextSets}>
            First Set
          </Text>
        );
      }
      return (
        completedSets.map(each =>
          <Text key={each.set} style={styles.logTextSets}>
            {`Set ${each.set}: ${each.weight}x${each.reps}`}
          </Text>
        )
      );
    } else if (type === 'past') {
      if (fetchedLog.length === 0) {
        return (
          <Text style={styles.logTextSets}>
            No Past Log
          </Text>
        );
      }
      return (
        fetchedLog.completedSets.map(each =>
          <Text key={each.set} style={styles.logTextSets}>
            {`Set ${each.set}: ${each.weight}x${each.reps}`}
          </Text>
        )
      );
    }
  }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    const {
      onPressSave, reps, weight, setReps, setWeight, exerciseName, workoutComplete
    } = this.props.workoutStore;

    if (workoutComplete) {
      return <Overview gradients={gradients} navigation={this.props.navigation} />;
    }

    return (
      <LinearGradient colors={gradients} style={styles.container} >

        <Animatable.View style={styles.headerContainer} animation='mySlideInDown'>
          <Text style={styles.headerText}>{exerciseName}</Text>
        </Animatable.View>

        <Animatable.View style={styles.logContainer} animation='mySlideInDown'>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }} >
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Current Log</Text>
              {this.renderLog(styles, 'current')}
            </View>
            <View style={styles.divider} />
            <View style={{ flex: 1 }}>
              <Text style={styles.logTextHeader}>Past Log</Text>
              {this.renderLog(styles, 'past')}
            </View>
          </View>
        </Animatable.View>

        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <Animatable.View style={styles.inputContainer} animation='mySlideInLeft' delay={750}>
            <Text style={styles.inputHeader}>Weight</Text>
            {this.renderTextInput(styles, 'weight')}
            <Picker
              type='weight'
              weight={weight}
              setWeight={change => setWeight(change)}
            />
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} animation='mySlideInRight' delay={1000}>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput(styles, 'reps')}
            <Picker
              type='reps'
              reps={reps}
              setReps={change => setReps(change)}
            />
          </Animatable.View>
        </View>

        <Animatable.View animation='mySlideInUp' delay={1250}>
          <ActionBar
            workout
            navigation={this.props.navigation}
            onPressSave={() => onPressSave()}
            onPressClose={() => this.renderCloseAlert()}
          />
        </Animatable.View>


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
        <DropdownAlert
          showCancel
          translucent
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          onCancel={() => this.props.navigation.goBack(null)}
          titleStyle={[styles.dropdownTitle, { marginLeft: 0 }]}
          messageStyle={[styles.dropdownMessage, { marginLeft: 0 }]}
          ref={ref => (this.dropdownExit = ref)}
        />

        {this.props.workoutStore.showCountDown ? <CountDown /> : null}

      </LinearGradient>
    );
  }
}

export default Workout;
