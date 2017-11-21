import React from 'react';
import { Platform } from 'react-native';
import { Header as NativeHeader } from 'react-native-elements';

const Header = ({ title, bgColor, textColor, onLeftPress, onRightPress }) => {
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
        style: { fontFamily: 'Exo-Medium', color: textColor, fontSize: 20 }
      }}
      /*rightComponent={{
        icon: 'exit-to-app',
        color: '#fff',
        onPress:
        onRightPress,
        underlayColor: 'transparent'
      }} */
      outerContainerStyles={{
        backgroundColor: bgColor,
        borderBottomWidth: 0,
        height: Platform.OS === 'android' ? 75 : 65
      }}
    />
  );
};

export default Header;
