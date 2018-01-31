import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

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

const WorkoutOverview = ({ performed, duration, goBack }) => {
  const {
    exerciseTotal, setTotal, repsTotal, weightTotal,
  } = calculateStats(performed);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overview</Text>
      <View style={styles.statsView}>
        <Text style={styles.overviewTitle}>Workout Duration:</Text>
        <Text style={styles.overviewDetail}>{duration}</Text>
        <Text style={styles.overviewTitle}>Weight Lifted:</Text>
        <Text style={styles.overviewDetail}>{weightTotal}</Text>
        <Text style={styles.overviewTitle}>Sets Completed:</Text>
        <Text style={styles.overviewDetail}>{setTotal}</Text>
        <Text style={styles.overviewTitle}>Reps Completed:</Text>
        <Text style={styles.overviewDetail}>{repsTotal}</Text>
        <Text style={styles.overviewTitle}>Exercises Completed:</Text>
        <Text style={styles.overviewDetail}>{exerciseTotal}</Text>
      </View>
      <Icon
        name="close"
        iconStyle={styles.icon}
        onPress={() => goBack()}
        underlayColor="transparent"
        containerStyle={styles.iconContainer}
      />
    </View>
  );
};

export default WorkoutOverview;
