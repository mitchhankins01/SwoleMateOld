import React, { Component } from 'react';
import { Text } from 'react-native';

export default class RenderCount extends Component {
  constructor(props) {
    super(props);
    this.count = 1;
  }

  componentWillUpdate() {
    this.count += 1;
  }

  render() {
    return <Text>{this.count}</Text>;
  }
}
