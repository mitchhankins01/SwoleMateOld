import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Platform, Picker as RNPicker } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

import { ThemeSelector } from '../Themes';
import { Fonts, Constants } from '../Themes';

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
  const Colors = ThemeSelector(props.theme);

  let array = _.range(0, 505, 5);
  if (type === 'reps') array = _.range(0, 101, 1);

  switch (Platform.OS) {
    case 'android':
      return (
        <WheelPicker
          isCurved
          renderIndicator
          itemTextSize={40}
          itemTextColor={Colors.text}
          data={getNumbers(type, array)}
          selectedItemTextColor={Colors.text}
          indicatorColor={Colors.primaryColor}
          itemTextFontFamily={Fonts.type.medium}
          selectedItemPosition={type === 'weight' ? Number(weight / 5) : Number(reps)}
          style={{ height: Constants.DEV_HEIGHT * 0.3, marginTop: 10, width: '100%' }}
          onItemSelected={event => onChangeInput(type, event.data, setReps, setWeight)}
        />
      );
    default:
      return (
        <RNPicker
          selectedValue={type === 'weight' ? weight.toString() : reps.toString()}
          onValueChange={number => onChangeInput(type, number, setReps, setWeight)}
          itemStyle={{
            color: Colors.text,
            textAlign: 'center',
            fontSize: Fonts.size.regular,
            fontFamily: Fonts.type.medium,
          }}
        >
          {array.map(number => (
            <RNPicker.Item key={number} label={number.toString()} value={number.toString()} />
          ))}
        </RNPicker>
      );
  }
};

export default connect(({ auth }) => auth)(Picker);
