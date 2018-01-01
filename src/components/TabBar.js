import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TabBarBottom } from 'react-navigation';

import themeStyles from './styles';

@inject('userStore') @observer
class TabBar extends Component {
  render() {
    const styles = themeStyles[this.props.userStore.selected];

    return (
      <TabBarBottom
      {...this.props}
      inactiveTintColor={'#BEC3C7'}//{styles.$primaryColor}
      activeTintColor={styles.$primaryColor}//{styles.$primaryColor}
      labelStyle={{ fontFamily: 'exo', fontSize: 14 }}
      style={{
        height: 55,
        borderTopWidth: 1,
        borderTopColor: styles.$primaryColor,
        backgroundColor: styles.$tertiaryColor,
      }}
      tabStyle={{
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: styles.$primaryColor,
        backgroundColor: 'rgba(237, 240, 241, 0.1)',
      }}
      />
    );
  }
}

export default TabBar;


// import { Platform } from 'react-native';
// import React, { Component } from 'react';
// import { inject, observer } from 'mobx-react';
// import { TabBarBottom } from 'react-navigation';
//
// import themeStyles from './styles';
//
// @inject('userStore') @observer
// class TabBar extends Component {
//   render() {
//     const styles = themeStyles[this.props.userStore.selected];
//
//     return (
//       <TabBarBottom
//       {...this.props}
//       activeTintColor={'#EDF0F1'}//{styles.$primaryColor}
//       inactiveTintColor={'#BEC3C7'}//{styles.$primaryColor}
//       style={{
//         backgroundColor: styles.$secondaryColor,
//         height: Platform.OS === 'android' ? 55 : 52
//       }}
//       labelStyle={{ fontFamily: 'exo', fontSize: 14 }}
//       />
//     );
//   }
// }
//
// export default TabBar;
