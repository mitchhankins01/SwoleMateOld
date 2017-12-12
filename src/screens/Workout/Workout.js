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
    exercises: [],
  }

  componentWillMount() {
    const exercises = this.props.programStore.exercises.filter(each => {
      return each.day === this.props.programStore.selectedDayKey;
    });
    this.setState({ exercises });
  }

  componentDidMount() {
    // this.timePassed = setInterval(() => {
    //   this.setState({ timePassed: this.state.timePassed + 1 });
    // }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timePassed);
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
    console.log(this.state);
    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Animatable.View style={styles.headerContainer} duration={750} animation='zoomIn'>
          <Text style={styles.headerText}>Exercise Name</Text>
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
        <ActionBar workout navigation={this.props.navigation} timePassed={this.state.timePassed} />
      </LinearGradient>
    );
  }
}

export default Workout;
