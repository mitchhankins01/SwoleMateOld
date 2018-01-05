import { toJS } from 'mobx';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  ListView,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import { Overview } from './';
import themeStyles from './styles';
import { Alert } from '../../components/Alert';
import { Timer } from '../../components/Timer';
import { Picker } from '../../components/Picker';
import { CountDown } from '../../components/CountDown';

@inject('userStore', 'programStore', 'workoutStore', 'logStore') @observer
class Workout extends Component {
  componentWillMount() {
    const {
      workoutStore: { initWorkout },
      programStore: { exercises, selectedDayKey, allExercises }
    } = this.props;
    initWorkout(exercises, selectedDayKey, allExercises);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.routeName === 'Workout') {
        this.props.workoutStore.toggleAlert(true);
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.props.workoutStore.terminateWorkout();
  }

  renderTextInput(styles, type, ref) {
    const { reps, weight, setReps, setWeight } = this.props.workoutStore;

    return (
    <TextInput
      ref={ref}
      keyboardType='numeric'
      style={styles.spinnerText}
      enablesReturnKeyAutomatically
      underlineColorAndroid='transparent'
      value={type === 'weight' ? weight.toString() : reps.toString()}
      onFocus={() => {
        if (type === 'reps') return setReps('');
        if (type === 'weight') return setWeight('');
      }}
      onChangeText={number => {
        if (type === 'reps') return setReps(number);
        if (type === 'weight') return setWeight(number);
      }}
    />
    );
  }

  renderLog(styles, type) {
    const fetchedLog = toJS(this.props.workoutStore.fetchedLog);
    const { exerciseLog: { completedSets } } = this.props.workoutStore;

    if (type === 'current') {
      if (completedSets.length === 0) {
        return (
          <Text style={styles.logTextSets}>
            First Set
          </Text>
        );
      }
      return (
        <ScrollView>
          {completedSets.map(each =>
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set}: ${each.weight}x${each.reps}`}
            </Text>
          )}
        </ScrollView>
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
        <ScrollView>
          {fetchedLog.completedSets.map(each =>
            <Text key={each.set} style={styles.logTextSets}>
              {`Set ${each.set}: ${each.weight}x${each.reps}`}
            </Text>
          )}
        </ScrollView>
      );
    }
  }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const {
      reps,
      weight,
      setReps,
      setWeight,
      onPressSave,
      toggleAlert,
      exerciseName,
      showPastLogs,
      fetchedLogAll,
      workoutComplete,
      toggleShowPastLogs,
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
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleShowPastLogs(true)}>
              <Text style={styles.logTextHeader}>Past Log</Text>
              {this.renderLog(styles, 'past')}
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <Animatable.View style={styles.inputContainer} animation='mySlideInLeft' delay={250}>
            <Text style={styles.inputHeader}>Weight</Text>
            {this.renderTextInput(styles, 'weight', 'weightInput')}
            <Picker
              type='weight'
              weight={weight}
              setWeight={change => setWeight(change)}
            />
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} animation='mySlideInRight' delay={250}>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput(styles, 'reps', 'repsInput')}
            <Picker
              type='reps'
              reps={reps}
              setReps={change => setReps(change)}
            />
          </Animatable.View>
        </View>

        <Animatable.View style={styles.actionBar} animation='mySlideInUp' delay={500}>
          <Icon
            size={30}
            type='entypo'
            name={'back'}
            color={'#EDF0F1'}
            iconStyle={{ padding: 15 }}
            underlayColor={'transparent'}
            onPress={() => toggleAlert(true)}
          />
          <Text style={styles.actionBarText}>
            <Timer />
            {/* {new Date(this.props.workoutStore.timePassed * 1000).toISOString().substr(12, 7)} */}
          </Text>
          <Icon
            size={25}
            type='entypo'
            name={'check'}
            color={'#EDF0F1'}
            iconStyle={{ padding: 15 }}
            underlayColor={'transparent'}
            onPress={() => {
              onPressSave();
              this.refs.repsInput.blur();
              this.refs.weightInput.blur();
            }}
          />
        </Animatable.View>

        {showPastLogs ?
        <View style={styles.pastLogsContainer}>
          <Text style={[styles.headerText, { marginVertical: 40 }]}>Past Logs</Text>
          <ListView
            style={{ width: '100%' }}
            dataSource={ds.cloneWithRows(toJS(fetchedLogAll))}
            renderRow={rowData => {
              return (
                <Text key={rowData.logKey} style={styles.logTextSets}>
                  {`${rowData.completed}\n`}
                  {rowData.completedSets.map(set => {
                    return (
                      <Text key={set.set} style={styles.logTextSets}>
                        {`Set ${set.set}: ${set.weight}x${set.reps}\n`}
                      </Text>
                    );
                  })}
                </Text>
              );
            }}
          />
          <Icon
            size={50}
            name='close'
            onPress={() => toggleShowPastLogs(false)}
            iconStyle={{ color: '#EDF0F1', marginVertical: 30 }}
          />
        </View>
      : null}

        {this.props.workoutStore.showLastSetInfo ?
          <Alert
            acknowledge
            title='Last Set!'
            onPressSave={() => this.props.navigation.goBack(null)}
            message={`Up Next: \n${this.props.workoutStore.nextExerciseName.name}`}
            onPressSave={() => this.props.workoutStore.toggleLastSetInfo(false)}
          />
        : null}

        {this.props.workoutStore.showAlert ?
          <Alert
            title='Are You Sure?'
            message='Your workout will not be saved'
            onPressSave={() => this.props.navigation.goBack(null)}
            onPressClose={() => this.props.workoutStore.toggleAlert(false)}
          />
          : null}

        {this.props.workoutStore.showCountDown ? <CountDown /> : null}

      </LinearGradient>
    );
  }
}

export default Workout;
