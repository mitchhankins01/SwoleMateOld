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

      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default observer(Somatics);
