import _ from 'lodash';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Picker as RNPicker } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

import { Fonts, Constants } from '../Themes';

const styles = EStyleSheet.create({
  $textColor: '$text',
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
});

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
          data={getNumbers(type, array)}
          indicatorColor={styles.$primary}
          itemTextColor={styles.$textColor}
          itemTextFontFamily={Fonts.type.medium}
          selectedItemTextColor={styles.$textColor}
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
            textAlign: 'center',
            color: styles.$textColor,
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

export default Picker;
