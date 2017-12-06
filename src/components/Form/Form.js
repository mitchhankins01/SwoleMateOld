import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-elements';

import themeStyles from './styles';
import {
  updateScreenIndex,
} from '../../actions/program_actions';

const TForm = t.form.Form;

class Form extends Component {
  state = {
    selectedFilterGroup: 'Show All Exercises',
    showExerciseList: false,
    selectedExerciseKey: '',
    selectedExerciseName: '',
  }

  onSavePressed() {
    const getValue = () => {
      switch (this.props.formType) {
        default: return;
        case 'addProgram': return this.refs.addProgramForm.getValue();
        case 'addProgramDay': return this.refs.addProgramDayForm.getValue();
        case 'addProgramExercise': return this.refs.addProgramExercise.getValue();
      }
    };

    if (getValue()) {
      console.log(getValue());
    }
  }

  renderExerciseList(styles) {
    const { selectedFilterGroup } = this.state;

    const exercises = () => {
      if (selectedFilterGroup === '' || selectedFilterGroup === 'Show All Exercises') {
        return [...this.props.allExercises];
      }

      return (
        this.props.allExercises.filter(exercise => {
          return exercise.group === this.state.selectedFilterGroup;
        })
      );
    };

    const options = ['Show All Exercises', 'Abs', 'Back', 'Biceps', 'Calves',
      'Chest', 'Forearms', 'Glutes', 'Shoulders', 'Triceps', 'Cardio'];

    return (
      <View>
        <ModalDropdown
          options={options}
          style={styles.dropdownContainer}
          defaultValue={selectedFilterGroup}
          dropdownStyle={styles.dropdownList}
          textStyle={styles.dropdownContainerText}
          dropdownTextStyle={styles.dropdownContainerText}
          onSelect={(index, value) => this.setState({ selectedFilterGroup: value })}
        />
        {exercises().map(exercise => {
          return (
            <Button
              raised
              transparent
              key={exercise.key}
              title={exercise.name}
              fontFamily='Exo-Regular'
              containerViewStyle={{ backgroundColor: 'transparent' }}
              buttonStyle={{
                height: 35,
                marginVertical: 3,
                backgroundColor: 'transparent',
              }}
              onPress={() => this.setState({
                showExerciseList: false,
                selectedExerciseKey: exercise.key,
                selectedExerciseName: exercise.name,
              })}
            />
          );
        })}
      </View>
    );
  }

  render() {
    const { showExerciseList, selectedExerciseName } = this.state;
    const { dispatch, formType, theme } = this.props;
    const styles = themeStyles[theme];

    const exercisesButton = () => {
      return (
        <Button
          raised
          fontFamily='Exo-Regular'
          title={selectedExerciseName || 'Select Exercise'}
          icon={{ name: 'dumbbell', type: 'material-community' }}
          containerViewStyle={{ backgroundColor: 'transparent' }}
          buttonStyle={{ marginBottom: 10, backgroundColor: 'transparent' }}
          onPress={() => this.setState({ showExerciseList: !showExerciseList })}
        />
      );
    };

    const getForm = () => {
      switch (formType) {
        default: return;
        case 'addProgram':
          return <TForm ref='addProgramForm' type={newProgram} options={programOptions} />;
        case 'addProgramDay':
          return <TForm ref='addProgramDayForm' type={newProgramDay} options={dayOptions} />;
        case 'addProgramExercise':
          return <TForm ref='addProgramExercise' type={newProgramExercise} />;
      }
    };

    return (
      <View>
        {formType === 'addProgramExercise' ? exercisesButton() : null}
        {this.state.showExerciseList ? this.renderExerciseList(styles) : getForm()}
        <View style={[styles.cardDivider, { marginTop: 20 }]} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'back'}
            style={{ color: '#EDF0F1' }}
            underlayColor={'transparent'}
            onPress={() => dispatch(updateScreenIndex('selectedProgram'))}
          />
          <Entypo
            size={25}
            name={'check'}
            style={{ color: '#EDF0F1' }}
            underlayColor={'transparent'}
            onPress={() => this.onSavePressed()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    theme: theme.selected,
    allExercises: program.allExercises,
  };
};

export default connect(mapStateToProps)(Form);

// New Program
const programOptions = {
  fields: {
    type: {
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    level: {
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    frequency: {
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    }
  }
};

const type = t.enums({
  Bulking: 'Bulking',
  Cutting: 'Cutting',
  Maintaining: 'Maintaining',
  Other: 'Other',
});

const level = t.enums({
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
});

const frequency = t.enums({
  1: '1 day p/w',
  2: '2 days p/w',
  3: '3 days p/w',
  4: '4 days p/w',
  5: '5 days p/w',
  6: '6 days p/w',
  7: '7 days p/w',
});

const newProgram = t.struct({
  name: t.String,
  description: t.String,
  type,
  level,
  frequency,
});

// New Program Day
const dayOptions = {
  fields: {
    primaryGroup: {
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    secondaryGroup: {
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    }
  }
};

const muscleGroups = t.enums({
  Abs: 'Abs',
  Back: 'Back',
  Biceps: 'Biceps',
  Calves: 'Calves',
  Chest: 'Chest',
  Forearms: 'Forearms',
  Glutes: 'Glutes',
  Shoulders: 'Shoulders',
  Triceps: 'Triceps',
  Cardio: 'Cardio',
});
const newProgramDay = t.struct({
  name: t.String,
  description: t.String,
  primaryGroup: muscleGroups,
  secondaryGroup: muscleGroups,
});

// New Program Exercise
const newProgramExercise = t.struct({
  sets: t.Number,
  reps: t.Number,
  rest: t.Number,
});
