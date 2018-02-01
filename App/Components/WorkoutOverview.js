import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { ThemeSelector } from '../Themes';
import styles from './Styles/WorkoutOverviewStyles';

const calculateStats = (performed) => {
  let setTotal = 0;
  let repsTotal = 0;
  let weightTotal = 0;
  let exerciseTotal = 0;
  _.mapValues(performed, (value) => {
    exerciseTotal += 1;
    _.mapValues(value, (thisValue) => {
      setTotal += 1;
      repsTotal += Number(thisValue.reps);
      weightTotal += thisValue.weight / (1.0278 - 0.0278 * thisValue.reps);
    });
  });

  return {
    setTotal,
    repsTotal,
    weightTotal,
    exerciseTotal,
  };
};

const WorkoutOverview = ({
  performed, duration, goBack, theme,
}) => {
  const {
    exerciseTotal, setTotal, repsTotal, weightTotal,
  } = calculateStats(performed);
  const Colors = ThemeSelector(theme);
  return (
    <View style={[styles.container, { backgroundColor: Colors.secondaryColor }]}>
      <Text style={[styles.header, { color: Colors.text }]}>Overview</Text>
      <View style={styles.statsView}>
        <Text style={[styles.overviewTitle, { color: Colors.text }]}>Workout Duration:</Text>
        <Text style={[styles.overviewDetail, { color: Colors.text }]}>{duration}</Text>
        <Text style={[styles.overviewTitle, { color: Colors.text }]}>Weight Lifted:</Text>
        <Text style={[styles.overviewDetail, { color: Colors.text }]}>{weightTotal}</Text>
        <Text style={[styles.overviewTitle, { color: Colors.text }]}>Sets Completed:</Text>
        <Text style={[styles.overviewDetail, { color: Colors.text }]}>{setTotal}</Text>
        <Text style={[styles.overviewTitle, { color: Colors.text }]}>Reps Completed:</Text>
        <Text style={[styles.overviewDetail, { color: Colors.text }]}>{repsTotal}</Text>
        <Text style={[styles.overviewTitle, { color: Colors.text }]}>Exercises Completed:</Text>
        <Text style={[styles.overviewDetail, { color: Colors.text }]}>{exerciseTotal}</Text>
      </View>
      <Icon
        name="close"
        onPress={() => goBack()}
        underlayColor="transparent"
        iconStyle={[styles.icon, { color: Colors.primaryColor }]}
        containerStyle={[
          styles.iconContainer,
          { borderColor: Colors.primaryColor, shadowColor: Colors.primaryColor },
        ]}
      />
    </View>
  );
};

export default connect(({ auth }) => auth)(WorkoutOverview);
