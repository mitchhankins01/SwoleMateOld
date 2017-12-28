import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';

import themeStyles from './styles';

const TForm = t.form.Form;

@inject('userStore', 'programStore') @observer
class Form extends Component {
  state = {
    showExerciseList: false,
    selectedExerciseKey: '',
    selectedExerciseName: '',
    selectedFilterGroup: 'Show All Exercises',
  }

  onSavePressed() {
    const { formType, programStore } = this.props;
    const { showExerciseList, selectedExerciseKey } = this.state;
    const {
      addProgramForm,
      updateProgramForm,
      addProgramDayForm,
      updateProgramDayForm,
      selectExerciseButton,
      addProgramExerciseForm,
    } = this.refs;

    if (showExerciseList) return this.setState({ showExerciseList: false });
    if (!selectedExerciseKey && selectExerciseButton) return selectExerciseButton.wobble();

    const getValue = () => {
      switch (formType) {
        default: return;
        case 'addProgram': return addProgramForm.getValue();
        case 'addProgramDay': return addProgramDayForm.getValue();
        case 'addProgramExercise': return addProgramExerciseForm.getValue();
        case 'updateProgram': return updateProgramForm.getValue();
        case 'updateProgramDay': return updateProgramDayForm.getValue();
      }
    };

    if (getValue()) {
      switch (formType) {
        default: return;
        case 'addProgram':
          return programStore.addProgram(getValue());
        case 'addProgramDay':
          return programStore.addProgramDay(getValue(), programStore.info);
        case 'addProgramExercise':
          return (
            programStore.addProgramExercise(getValue(), programStore.info,
            programStore.selectedDayKey, selectedExerciseKey)
          );
        case 'updateProgram':
          return programStore.updateProgram(getValue());
        case 'updateProgramDay':
          return programStore.updateProgramDay(getValue());
      }
    }
  }

  renderExerciseList(styles) {
    const { selectedFilterGroup } = this.state;

    const exercises = () => {
      if (selectedFilterGroup === '' || selectedFilterGroup === 'Show All Exercises') {
        return [...this.props.programStore.allExercises];
      }

      return (
        this.props.programStore.allExercises.filter(exercise => {
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
        <FlatList
          data={exercises()}
          renderItem={({ item }) => {
            return (
              <Button
                raised
                transparent
                key={item.key}
                title={item.name}
                fontFamily='Exo-Regular'
                buttonStyle={{ height: 45, backgroundColor: 'transparent', paddingVertical: 10 }}
                containerViewStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start' }}
                onPress={() => this.setState({
                  showExerciseList: false,
                  selectedExerciseKey: item.key,
                  selectedExerciseName: item.name,
                })}
              />
            );
          }}
        />
      </View>
    );
  }

  render() {
    const { showExerciseList, selectedExerciseName } = this.state;
    const { formType, userStore, programStore, selectedUpdate } = this.props;
    const styles = themeStyles[userStore.selected];

    const exercisesButton = () => {
      return (
        <Animatable.View ref='selectExerciseButton'>
          <Button
            raised
            fontFamily='Exo-Regular'
            title={selectedExerciseName || 'Select Exercise'}
            icon={{ name: 'dumbbell', type: 'material-community' }}
            containerViewStyle={{ backgroundColor: 'transparent' }}
            buttonStyle={{ backgroundColor: 'transparent', padding: 15 }}
            onPress={() => this.setState({ showExerciseList: !showExerciseList })}
          />
        </Animatable.View>
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
          return <TForm ref='addProgramExerciseForm' type={newProgramExercise} />;
        case 'updateProgram':
          return (
            <TForm
              type={newProgram}
              ref='updateProgramForm'
              options={programOptions}
              value={this.props.programStore.updateFormItem}
            />
          );
        case 'updateProgramDay':
          return (
            <TForm
              type={newProgramDay}
              options={dayOptions}
              ref='updateProgramDayForm'
              value={this.props.programStore.updateFormItem}
            />
          );
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
            style={{ color: '#EDF0F1', padding: 10, margin: -10 }}
            underlayColor={'transparent'}
            onPress={() => {
              programStore.toggleShowUpdateForm(false);
              programStore.updateScreenIndex('selectedProgram');
            }}
          />
          <Entypo
            size={25}
            name={'check'}
            style={{ color: '#EDF0F1', padding: 10, margin: -10 }}
            underlayColor={'transparent'}
            onPress={() => this.onSavePressed()}
          />
        </View>
      </View>
    );
  }
}

export default Form;

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
