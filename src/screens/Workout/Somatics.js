import React from 'react';
import t from 'tcomb-form-native';
import { observer } from 'mobx-react';
import { Icon } from 'react-native-elements';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import themeStyles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Form = t.form.Form;
// Workout log must be cleared after submitting
function Somatics(props) {
  const styles = themeStyles[props.themeStore.selected];
  const duration = new Date(this.props.workoutStore.timePassed * 1000).toISOString().substr(12, 7);

  return (
    <LinearGradient colors={props.gradients} style={styles.container} >
      <Text style={styles.somaticsHeaderText}>Workout Complete</Text>
      <Text style={styles.somaticsSubHeaderText}>Somatics</Text>
      <Text style={styles.somaticsSubHeaderText}>{`Duration: ${duration}`}</Text>
      <View style={{ flex: 1, width: DEVICE_WIDTH * 0.9, alignSelf: 'center' }}>
        <Form
          ref='form'
          type={somatic}
          options={options}
        />

      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default observer(Somatics);

const options = {
  auto: 'placeholders',
  fields: {
    attitude: {
      nullOption: { value: '', text: 'Select Attitude' },
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    strength: {
      nullOption: { value: '', text: 'Select Strength Level' },
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    quality: {
      nullOption: { value: '', text: 'Select Workout Quality' },
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    primaryGroup: {
      nullOption: { value: '', text: 'Primary Muscles Worked' },
      itemStyle: {
        color: '#EDF0F1',
        fontFamily: 'Exo-Regular',
      },
    },
    secondaryGroup: {
      nullOption: { value: '', text: 'Secondary Muscles Worked' },
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
const attitude = t.enums({
  extremely_motivated: 'Extremely Motivated',
  mostly_motivated: 'Mostly Motivated',
  normal: 'Normal',
  mostly_unmotivated: 'Mostly Unmotivated',
  extremely_unmotivated: 'Extremely Unmotivated',
});
const strength = t.enums({
  major_increase: 'Major Increase',
  increase: 'Increase',
  stable: 'Stable',
  decrease: 'Decrease',
  major_decrease: 'Major Decrease',
});
const quality = t.enums({
  excellent: 'Excellent',
  above_average: 'Above Average',
  average: 'Average',
  below_average: 'Below Average',
  poor: 'Poor',
});
const somatic = t.struct({
  attitude,
  strength,
  quality,
  //primaryGroup: muscleGroups,
  //secondaryGroup: muscleGroups,
});
