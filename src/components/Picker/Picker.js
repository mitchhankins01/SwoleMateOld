import _ from 'lodash';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Platform, Picker as RNPicker } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

import themeStyles from './styles';

const getNumbers = (type, array) => {
  switch (type) {
    default: return null;
    case 'reps': return array.map(number => number.toString());
    case 'weight': return array.map(number => number.toString());
  }
};

const onChangeInput = (type, number, setReps, setWeight) => {
  switch (type) {
    default: return;
    case 'reps': return setReps(number); //this.setState({ reps: number });
    case 'weight': return setWeight(number); // this.setState({ weight: number });
  }
};

export default inject('userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const { type, weight, reps, setReps, setWeight } = props;

  let array = _.range(0, 505, 5);
  if (type === 'reps') array = _.range(0, 101, 1);

  switch (Platform.OS) {
    case 'android':
      return (
        <WheelPicker
          isCurved
          renderIndicator
          itemTextSize={40}
          itemTextColor='#EDF0F1'
          data={getNumbers(type, array)}
          itemTextFontFamily='Exo-Medium'
          selectedItemTextColor='#EDF0F1'
          indicatorColor={styles.$primaryColor}
          style={{ height: 200, marginTop: 10, width: '100%' }}
          onItemSelected={event => onChangeInput(type, event.data, setReps, setWeight)}
          selectedItemPosition={
            type === 'weight' ? Number(weight / 5) : Number(reps)
          }
        />
      );
    default:
      return (
        <RNPicker
          onValueChange={number => onChangeInput(type, number, setReps, setWeight)}
          selectedValue={type === 'weight' ? weight.toString() : reps.toString()}
          itemStyle={{ textAlign: 'center', color: '#EDF0F1', fontFamily: 'Exo-Medium', fontSize: 16 }}
        >
          {array.map(number => {
            return (
              <RNPicker.Item key={number} label={number.toString()} value={number.toString()} />
            );
          })}
        </RNPicker>
      );
  }
}));
