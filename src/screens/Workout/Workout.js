import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import { Wheel } from 'teaset';

import themeStyles from './styles';
import { ActionBar } from '../../components/ActionBar';

class Workout extends Component {
  constructor(props) {
    super(props);
    this.numbers = [];
    for (let i = 0; i <= 100; ++i) this.numbers.push(i);
  }

  state = {
    reps: 10,
    weight: 10,
  }

  onChangeWheel(type, number) {
    switch (type) {
      default: return;
      case 'reps': return this.setState({ reps: number });
      case 'weight': return this.setState({ weight: number });
    }
  }

  renderWheel(styles, type) {
    return (
      <Wheel
        holeLine={0}
        items={this.numbers}
        maskStyle={{ backgroundColor: 'transparent' }}
        onChange={number => this.onChangeWheel(type, number)}
        index={type === 'weight' ? this.state.weight : this.state.reps }
        style={{ height: 200, marginTop: 10, backgroundColor: 'transparent' }}
        itemStyle={{ textAlign: 'center', color: '#EDF0F1', fontFamily: 'Exo-Medium' }}
        holeStyle={{ borderColor: styles.$primaryColor, borderTopWidth: 1, borderBottomWidth: 1 }}
      />
    );
  }
  render() {
    const styles = themeStyles[this.props.theme]
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];
    console.log(this.state.reps, this.state.weight);
    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Animatable.View style={styles.headerContainer} duration={750} animation='zoomIn'>
          <Text style={styles.headerText}>Exercise Name</Text>
        </Animatable.View>
        <Animatable.View style={styles.logContainer} duration={750} animation='zoomIn'>
          <Text style={[styles.headerText, { fontSize: 18 }]}>Past Logs</Text>
        </Animatable.View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <Animatable.View style={styles.inputContainer} duration={750} animation='zoomIn'>
            <Text style={styles.inputHeader}>Weight</Text>
            {this.renderWheel(styles, 'weight')}
          </Animatable.View>
          <Animatable.View style={styles.inputContainer} duration={750} animation='zoomIn'>
            <Text style={styles.inputHeader}>Reps</Text>
            {this.renderWheel(styles, 'reps')}
          </Animatable.View>
        </View>
        <ActionBar workout navigation={this.props.navigation} />
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({ theme }) => {
  return {
    theme: theme.selected,
  };
};

export default connect(mapStateToProps)(Workout);
