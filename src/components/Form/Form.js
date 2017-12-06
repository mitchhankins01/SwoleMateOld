import t from 'tcomb-form-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  updateScreenIndex,
} from '../../actions/program_actions';

const TForm = t.form.Form;

class Form extends Component {
  onSavePressed() {
    const getValue = () => {
      switch (this.props.formType) {
        default: return;
        case 'addProgram': return this.refs.addProgramForm.getValue();
        case 'addProgramDay': return this.refs.addProgramDayForm.getValue();
        case 'addProgramExercise': return;
      }
    };

    if (getValue()) {
      console.log(getValue());
    }
  }

  render() {
    const { dispatch, formType } = this.props;

    const getForm = () => {
      switch (formType) {
        default: return;
        case 'addProgram':
          return <TForm ref='addProgramForm' options={programOptions} type={newProgram} />;
        case 'addProgramDay':
          return <TForm ref='addProgramDayForm' options={dayOptions} type={newProgramDay} />;
        case 'addProgramExercise': return;
      }
    };

    return (
      <View>
        {getForm()}
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

const mapStateToProps = ({ theme }) => {
  return {
    theme: theme.selected,
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
