import { Platform } from 'react-native';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TabBarBottom } from 'react-navigation';

import themeStyles from './styles';

@inject('themeStore') @observer
class TabBar extends Component {
  render() {
    const styles = themeStyles[this.props.themeStore.selected];

    return (
      <TabBarBottom
      {...this.props}
      activeTintColor={'#EDF0F1'}//{styles.$primaryColor}
      inactiveTintColor={'#BEC3C7'}//{styles.$primaryColor}
      style={{
        backgroundColor: styles.$secondaryColor,
        height: Platform.OS === 'android' ? 55 : 52
      }}
      labelStyle={{ fontFamily: 'exo', fontSize: 14 }}
      />
    );
  }
}

export default TabBar;
