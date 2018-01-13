import t from 'tcomb-form-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { AddWorkoutFB } from '../Helpers/Firebase';
import { Colors } from '../Themes';
import styles from './Styles/FormStyles';

const TForm = t.form.Form;

class AddWorkout extends Component {
  render() {
    const { goBack, program: { info } } = this.props;
    return (
      <View style={styles.formStyle}>
        <Icon name="folder" type="entypo" color={Colors.primaryColor} />
        <TForm ref="workoutForm" type={workoutType} options={workoutOptions} />
        <Icon
          name="check"
          type="entypo"
          underlayColor="transparent"
          color={Colors.text}
          iconStyle={styles.icon}
          containerStyle={styles.button}
          onPress={() => {
            const values = this.refs.workoutForm.getValue();
            if (values) {
              const programId = info.map(({ id }) => id).toString();
              AddWorkoutFB(values, programId);
              goBack();
            }
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  program: state.program,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkout);

const workoutOptions = {
  fields: {
    primaryGroup: {
      label: 'Primary Muscle Group',
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    secondaryGroup: {
      label: 'Secondary Muscle Group',
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
  },
};
const muscleGroups = t.enums({
  Abs: 'Abs',
  Back: 'Back',
  Biceps: 'Biceps',
  Calves: 'Calves',
  Chest: 'Chest',
  Forearms: 'Forearms',
  Glutes: 'Glutes',
  Legs: 'Legs',
  Shoulders: 'Shoulders',
  Triceps: 'Triceps',
  Cardio: 'Cardio',
});
const workoutType = t.struct({
  name: t.String,
  description: t.String,
  primaryGroup: muscleGroups,
  secondaryGroup: muscleGroups,
});
