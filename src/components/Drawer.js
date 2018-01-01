import React from 'react';
import { Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import themeStyles from './styles';

export default inject('programStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];

  return (
    <SafeAreaView
      forceInset={{ top: 'always', horizontal: 'never' }}
      style={{ flex: 1, backgroundColor: styles.$tertiaryColor }}
    >
      <Text
        style={{
          fontSize: 35,
          marginVertical: 20,
          color: '#EDF0F1',
          alignSelf: 'center',
          fontFamily: 'Exo-Bold',
          backgroundColor: 'transparent',
        }}
      >
        SwoleMate
      </Text>
      <DrawerItems
        {...props}
        inactiveTintColor={'#BEC3C7'}//{styles.$primaryColor}
        activeTintColor={styles.$primaryColor}//{styles.$primaryColor}
        labelStyle={{ fontFamily: 'Exo-Bold', fontSize: 16 }}
      />
    </SafeAreaView>
  );
}));

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
