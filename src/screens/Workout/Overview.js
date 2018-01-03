import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';

@inject('workoutStore', 'userStore') @observer
class Overview extends Component {
  state = {
    totalSets: 0,
    totalReps: 0,
    totalWeight: 0,
    totalExercises: 0,
  };

  componentWillMount() {
    const { workoutStore: {
      workoutLog: { completedExercises }
    } } = this.props;

    let totalReps = 0;
    let totalSets = 0;
    let totalWeight = 0;
    const totalExercises = completedExercises.length;

    completedExercises.forEach(each => {
      totalSets += each.completedSets.length;

      each.completedSets.forEach(detail => {
        totalWeight += detail.weight / (1.0278 - (0.0278 * detail.reps));

        totalReps += detail.reps;

        this.setState({
          totalSets,
          totalReps,
          totalWeight,
          totalExercises,
        });
      });
    });
  }

  render() {
    const {
      workoutStore: { timePassed },
      userStore: { imperial, selected },
    } = this.props;
    const { totalWeight, totalSets, totalReps, totalExercises } = this.state;

    const styles = themeStyles[selected];
    const duration = new Date(timePassed * 1000).toISOString().substr(12, 7);
    const weightLifted = `${totalWeight.toPrecision(4)} ${imperial ? 'Lbs' : 'Kg'}`;

    return (
      <LinearGradient
        colors={this.props.gradients}
        style={[styles.container, { justifyContent: 'space-between' }]}
      >
        <View>
          <Text style={styles.overviewHeaderText}>Workout Complete</Text>
          <Text style={styles.overviewSubHeaderText}>Overview</Text>
        </View>
        <View>
          <Text style={styles.overviewInfo}>Workout Duration:</Text>
          <Text style={styles.overviewDetail}>{duration}</Text>
          <Text style={styles.overviewInfo}>Weight Lifted:</Text>
          <Text style={styles.overviewDetail}>{weightLifted}</Text>
          <Text style={styles.overviewInfo}>Sets Completed:</Text>
          <Text style={styles.overviewDetail}>{totalSets}</Text>
          <Text style={styles.overviewInfo}>Reps Completed:</Text>
          <Text style={styles.overviewDetail}>{totalReps}</Text>
          <Text style={styles.overviewInfo}>Exercises Completed:</Text>
          <Text style={styles.overviewDetail}>{totalExercises}</Text>
        </View>
        <Button
          raised
          title='Back to Home'
          buttonStyle={{ backgroundColor: 'transparent' }}
          onPress={() => this.props.navigation.goBack(null)}
          icon={{ name: 'back', type: 'entypo', color: '#EDF0F1', size: 22 }}
          textStyle={{ fontFamily: 'Exo-Medium', fontSize: 22, color: '#EDF0F1' }}
          containerViewStyle={{ backgroundColor: 'transparent', marginBottom: 20 }}
        />
      </LinearGradient>
    );
  }
}

export default Overview;
