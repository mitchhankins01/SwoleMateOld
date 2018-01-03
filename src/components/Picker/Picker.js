import _ from 'lodash';
import { Wheel } from 'teaset';
import { Platform, Picker as RNPicker } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { WheelPicker } from 'react-native-wheel-picker-android';

import themeStyles from './styles';

@inject('workoutStore', 'userStore') @observer
class Picker extends Component {
  constructor(props) {
    super(props);
    this.repsArray = _.range(0, 101, 1);
    this.weightArray = _.range(0, 505, 5);
  }

  onChangeInput(type, number) {
    switch (type) {
      default: return;
      case 'reps': return this.props.setReps(number); //this.setState({ reps: number });
      case 'weight': return this.props.setWeight(number); // this.setState({ weight: number });
    }
  }

  getNumbers(type) {
    switch (type) {
      default: return null;
      case 'reps': return this.repsArray.map(number => number.toString());
      case 'weight': return this.weightArray.map(number => number.toString());
    }
  }

  render() {
    const { type, weight, reps } = this.props;
    const styles = themeStyles[this.props.userStore.selected];

    let array = this.weightArray;
    if (type === 'reps') array = this.repsArray;

    switch (Platform.OS) {
      case 'android':
        return (
          <WheelPicker
            isCurved
            renderIndicator
            itemTextSize={40}
            itemTextColor='#EDF0F1'
            data={this.getNumbers(type)}
            itemTextFontFamily='Exo-Medium'
            selectedItemTextColor='#EDF0F1'
            indicatorColor={styles.$primaryColor}
            style={{ height: 200, marginTop: 10, width: '100%' }}
            onItemSelected={event => this.onChangeInput(type, event.data)}
            selectedItemPosition={
              type === 'weight' ? Number(weight / 5) : Number(reps)
            }
          />
        );
      default:
        return (
          <RNPicker
            onValueChange={number => this.onChangeInput(type, number)}
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
  }
}

export default Picker;
