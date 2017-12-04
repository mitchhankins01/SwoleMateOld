import React from 'react';
import { Platform } from 'react-native';
import { Header as NativeHeader } from 'react-native-elements';

const Header = ({ title, styles, onLeftPress, onRightPress }) => {
  return (
    <NativeHeader
      /*leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress:
        onLeftPress,
        underlayColor: 'transparent'
      }}*/
      centerComponent={{
        text: title,
        style: { fontFamily: 'Exo-Medium', color: '#EDF0F1', fontSize: 20 }
      }}
      /*rightComponent={{
        icon: 'exit-to-app',
        color: '#fff',
        onPress:
        onRightPress,
        underlayColor: 'transparent'
      }} */
      outerContainerStyles={{
        backgroundColor: styles.$secondaryColor,
        borderBottomWidth: 0,
        elevation: 1,
        shadowOpacity: 1,
        height: 70, //Platform.OS === 'android' ? 75 : 65
      }}
    />
  );
};

export default Header;
