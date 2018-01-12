import React from 'react';
import { Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import { Colors, Fonts } from '../Themes';

const Drawer = props => (
  <SafeAreaView
    forceInset={{ top: 'always', horizontal: 'never' }}
    style={{ flex: 1, backgroundColor: Colors.tertiaryColor }}
  >
    <Text
      style={{
        fontSize: 35,
        marginVertical: 20,
        color: Colors.text,
        alignSelf: 'center',
        fontFamily: Fonts.type.bold,
        backgroundColor: 'transparent',
      }}
    >
      SwoleMate
    </Text>
    <DrawerItems
      {...props}
      inactiveTintColor="#BEC3C7"
      activeTintColor={Colors.primaryColor}
      labelStyle={{ fontFamily: 'Exo-Bold', fontSize: 16 }}
    />
  </SafeAreaView>
);

export default Drawer;
