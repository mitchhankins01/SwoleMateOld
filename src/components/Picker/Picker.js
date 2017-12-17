import { Wheel } from 'teaset';
import { Platform } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { WheelPicker } from 'react-native-wheel-picker-android';

import themeStyles from './styles';

@inject('workoutStore', 'themeStore') @observer
class Picker extends Component {
  constructor(props) {
    super(props);
    this.numbers = [];
    for (let i = 0; i <= 100; ++i) this.numbers.push(i);
  }

  onChangeInput(type, number) {
    switch (type) {
      default: return;
      case 'reps': return this.props.setReps(number); //this.setState({ reps: number });
      case 'weight': return this.props.setWeight(number); // this.setState({ weight: number });
    }
  }

  render() {
    const { type } = this.props;
    const styles = themeStyles[this.props.themeStore.selected];
    const wheelPickerData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    switch (Platform.OS) {
      case 'android':
        return (
          <WheelPicker
            isCurved
            renderIndicator
            itemTextSize={40}
            data={wheelPickerData}
            itemTextFontFamily='Exo-Medium'
            selectedItemTextColor='#EDF0F1'
            indicatorColor={styles.$primaryColor}
            style={{ height: 200, marginTop: 10, width: '100%' }}
            onItemSelected={event => this.onChangeInput(type, event.data)}
            selectedItemPosition={
              type === 'weight' ? Number(this.props.weight) - 1 : Number(this.props.reps) - 1
            }
          />
        );
      default:
        return (
          <Wheel
            holeLine={0}
            items={this.numbers}
            maskStyle={{ backgroundColor: 'transparent' }}
            onChange={number => this.onChangeInput(type, number)}
            style={{ height: 200, marginTop: 10, backgroundColor: 'transparent' }}
            index={type === 'weight' ? Number(this.props.weight) : Number(this.props.reps)}
            itemStyle={{ textAlign: 'center', color: '#EDF0F1', fontFamily: 'Exo-Medium' }}
            holeStyle={{
              borderColor: styles.$primaryColor, borderTopWidth: 1, borderBottomWidth: 1
            }}
          />
        );
    }
  }
}

export default Picker;
