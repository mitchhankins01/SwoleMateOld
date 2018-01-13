import _ from 'lodash';
import React from 'react';
import { Platform, Picker as RNPicker } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

import styles from './Styles/PickerStyles';

const getNumbers = (type, array) => {
  switch (type) {
    default:
      return null;
    case 'reps':
      return array.map(number => number.toString());
    case 'weight':
      return array.map(number => number.toString());
  }
};

const onChangeInput = (type, number, setReps, setWeight) => {
  switch (type) {
    default:
      return;
    case 'reps':
      return setReps(number); // this.setState({ reps: number });
    case 'weight':
      return setWeight(number); // this.setState({ weight: number });
  }
};

const Picker = (props) => {
  const {
    type, weight, reps, setReps, setWeight,
  } = props;

  let array = _.range(0, 505, 5);
  if (type === 'reps') array = _.range(0, 101, 1);

  switch (Platform.OS) {
    case 'android':
      return (
        <WheelPicker
          isCurved
          renderIndicator
          itemTextSize={40}
          itemTextColor="#EDF0F1"
          data={getNumbers(type, array)}
          itemTextFontFamily="Exo-Medium"
          selectedItemTextColor="#EDF0F1"
          indicatorColor={styles.$primaryColor}
          style={{ height: 200, marginTop: 10, width: '100%' }}
          onItemSelected={event => onChangeInput(type, event.data, setReps, setWeight)}
          selectedItemPosition={type === 'weight' ? Number(weight / 5) : Number(reps)}
        />
      );
    default:
      return (
        <RNPicker
          onValueChange={number => onChangeInput(type, number, setReps, setWeight)}
          selectedValue={type === 'weight' ? weight.toString() : reps.toString()}
          itemStyle={{
            fontSize: 16,
            color: '#EDF0F1',
            textAlign: 'center',
            fontFamily: 'Exo-Medium',
          }}
        >
          {array.map(number => (
            <RNPicker.Item key={number} label={number.toString()} value={number.toString()} />
          ))}
        </RNPicker>
      );
  }
};

export default Picker;
