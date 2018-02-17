import _ from 'lodash';
import React from 'react';
import Picker from 'react-native-wheel-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Picker as RNPicker } from 'react-native';

import { Constants, Fonts } from '../Themes';

const PickerItem = Picker.Item;

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

const Pickers = (props) => {
  const {
    type, weight, reps, setReps, setWeight,
  } = props;

  let array = _.range(0, 505, 5);
  if (type === 'reps') array = _.range(0, 101, 1);

  switch (Platform.OS) {
    case 'android':
      return (
        <Picker
          style={{ height: Constants.DEV_HEIGHT * 0.3 }}
          selectedValue={type === 'weight' ? weight.toString() : reps.toString()}
          itemStyle={{
            color: styles.$textColor,
            fontSize: Fonts.size.regular,
            fontFamily: Fonts.type.medium,
          }}
          onValueChange={number => onChangeInput(type, number, setReps, setWeight)}
        >
          {array.map((value, i) => (
            <PickerItem
              key={value.toString()}
              label={value.toString()}
              value={type === 'weight' ? i * 5 : i}
            />
          ))}
        </Picker>
        // <Wheel
        //   holeLine={0}
        //   items={type === 'weight' ? testArray : testArray}
        //   maskStyle={{ backgroundColor: 'transparent' }}
        //   index={type === 'weight' ? weight.toString() : reps.toString()}
        //   onChange={number => onChangeInput(type, number, setReps, setWeight)}
        //   style={{ height: 200, marginTop: 10, backgroundColor: 'transparent' }}
        //   itemStyle={{
        //     textAlign: 'center',
        //     color: styles.$textColor,
        //     fontFamily: Fonts.type.medium,
        //   }}
        //   holeStyle={{
        //     borderTopWidth: 1,
        //     borderBottomWidth: 1,
        //     borderColor: styles.$primary,
        //   }}
        // />
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

export default Pickers;
