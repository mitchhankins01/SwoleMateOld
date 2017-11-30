import { connect } from 'react-redux';
import { Platform } from 'react-native';
import React, { Component } from 'react';
import { TabBarBottom } from 'react-navigation';

import themeStyles from './styles';

class TabBar extends Component {
  render() {
    const styles = themeStyles[this.props.theme];

    return (
      <TabBarBottom
      {...this.props}
      activeTintColor={styles.$primaryColor}
      inactiveTintColor={styles.$primaryColor}
      style={{
        backgroundColor: styles.$secondaryColor,
        height: Platform.OS === 'android' ? 55 : 52
      }}
      labelStyle={{ fontFamily: 'exo', fontSize: 14 }}
      />
    );
  }
}

const mapStateToProps = ({ theme }) => {
  return {
    theme: theme.selected,
  };
};

export default connect(mapStateToProps)(TabBar);
