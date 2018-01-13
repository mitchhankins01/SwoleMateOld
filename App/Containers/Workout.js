import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Fonts } from '../Themes';
import Header from '../Components/Header';
import ActionButton from '../Components/ActionButton';
import styles, { gradients, textColor } from './Styles/WorkoutStyles';

const getButtons = goBack => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
  {
    icon: 'check',
    animation: 'zoomIn',
    onPress: () => {},
  },
];

const Workout = ({ goBack }) => (
  <LinearGradient style={styles.container} colors={gradients}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <Header noMenu title="Workout" />
    {/* Logs */}
    <View style={styles.logContainer} animation="mySlideInDown">
      <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.logTextHeader}>Current Log</Text>
          {/* {this.renderLog(styles, 'current')} */}
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleShowPastLogs(true)}>
          <Text style={styles.logTextHeader}>Past Log</Text>
          {/* {this.renderLog(styles, 'past')} */}
        </TouchableOpacity>
      </View>
    </View>
    <ActionButton buttons={getButtons(goBack)} />
  </LinearGradient>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
