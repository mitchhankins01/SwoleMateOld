import React from 'react';
import { Platform } from 'react-native';
import { Header as NativeHeader } from 'react-native-elements';

const Header = ({ title, styles, onLeftPress, onRightPress, navigation }) => {
  return (
    <NativeHeader
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        underlayColor: 'transparent',
        onPress: () => navigation.navigate('DrawerOpen'),
      }}
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
        zIndex: 100,
        elevation: 1,
        shadowOpacity: 1,
        borderBottomWidth: 0,
        shadowColor: 'rgba(0,0,0, 1)',
        backgroundColor: styles.$secondaryColor,
        height: 70, //Platform.OS === 'android' ? 75 : 65
      }}
    />
  );
};

export default Header;
