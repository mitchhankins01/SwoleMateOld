import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { AddWorkoutFB } from '../Helpers/Firebase';
import { Colors, Fonts } from '../Themes';
import styles from './Styles/FormStyles';

const TForm = t.form.Form;

class AddWorkout extends Component {
  state = { showExerciseList: false, searchGroup: 'Show All Exercises' };

  renderExerciseList() {
    const options = [
      'Show All Exercises',
      'Abs',
      'Back',
      'Biceps',
      'Calves',
      'Chest',
      'Forearms',
      'Glutes',
      'Legs',
      'Shoulders',
      'Triceps',
      'Cardio',
    ];
    const { searchGroup } = this.state;
    const exercises = () => {
      if (searchGroup === '' || searchGroup === 'Show All Exercises') {
        return [...this.props.programs.allExercises];
      }
      return this.props.programs.allExercises.filter(exercise => exercise.group === this.state.searchGroup);
    };
    return (
      <View>
        <ModalDropdown
          options={options}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          defaultValue={this.state.searchGroup}
          dropdownTextStyle={styles.dropdownItemText}
          onSelect={(index, value) => this.setState({ searchGroup: value })}
        />
        <FlatList
          style={{ marginBottom: 50, marginTop: 20 }}
          data={exercises()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  renderForm() {
    const { goBack, program: { info, showExercises } } = this.props;
    return (
      <View>
        <Icon
          color={Colors.primaryColor}
          name={showExercises ? 'dumbbell' : 'folder'}
          type={showExercises ? 'material-community' : 'entypo'}
        />
        {showExercises ? (
          <View>
            <TForm ref="exerciseForm" type={exerciseType} options={exerciseOptions} />
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => this.setState({ showExerciseList: true })}
            >
              <Text style={styles.selectButtonText}>Select Exercise</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TForm ref="workoutForm" type={workoutType} options={workoutOptions} />
        )}
        <Icon
          name="check"
          type="entypo"
          underlayColor="transparent"
          color={Colors.text}
          iconStyle={styles.icon}
          containerStyle={styles.button}
          onPress={() => {
            const values = showExercises
              ? this.refs.exerciseForm.getValue()
              : this.refs.workoutForm.getValue();
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

  render() {
    return (
      <View style={styles.formStyle}>
        {this.state.showExerciseList ? this.renderExerciseList() : this.renderForm()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkout);

const exerciseType = t.struct({
  sets: t.Number,
  reps: t.Number,
  rest: t.Number,
});

const exerciseOptions = {
  fields: {
    rest: {
      label: 'Rest (seconds)',
    },
  },
};

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
