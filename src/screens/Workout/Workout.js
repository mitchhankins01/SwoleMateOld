import { toJS } from 'mobx';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import { BackHandler, Text, TextInput, View, ScrollView, ListView, TouchableOpacity } from 'react-native';

import { Overview } from './';
import themeStyles from './styles';
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
      showPastLogs,
      exerciseName,
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
            {this.renderTextInput(styles, 'weight')}
            <Picker
              type='weight'
              weight={weight}
              setWeight={change => setWeight(change)}
            />
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} animation='mySlideInRight' delay={250}>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderTextInput(styles, 'reps')}
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
            onPress={() => this.renderCloseAlert()}
          />
          <Text style={styles.actionBarText}>
            {new Date(this.props.workoutStore.timePassed * 1000).toISOString().substr(12, 7)}
          </Text>
          <Icon
            size={25}
            type='entypo'
            name={'check'}
            color={'#EDF0F1'}
            iconStyle={{ padding: 15 }}
            underlayColor={'transparent'}
            onPress={() => this.onPressSave()}
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
          this.dropdown.alertWithType(
            'info', 'Last set', `Up Next: ${this.props.workoutStore.nextExerciseName.name}`
          )
        : null}
        <DropdownAlert
          translucent
          zIndex={5}
          closeInterval={3000}
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          titleStyle={styles.dropdownTitle}
          ref={ref => (this.dropdown = ref)}
          messageStyle={styles.dropdownMessage}
          onClose={() => this.props.workoutStore.toggleLastSetInfo(false)}
        />
        <DropdownAlert
          showCancel
          translucent
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          ref={ref => (this.dropdownExit = ref)}
          onCancel={() => this.props.navigation.goBack(null)}
          titleStyle={[styles.dropdownTitle, { marginLeft: 0 }]}
          messageStyle={[styles.dropdownMessage, { marginLeft: 0 }]}
        />

        {this.props.workoutStore.showCountDown ? <CountDown /> : null}

      </LinearGradient>
    );
  }
}

export default Workout;
