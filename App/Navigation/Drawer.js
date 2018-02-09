import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Fonts } from '../Themes';

const styles = EStyleSheet.create({
  $textColor: '$text',
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
});

const Drawer = props => (
  <SafeAreaView
    forceInset={{ top: 'always', horizontal: 'never' }}
    style={{ flex: 1, backgroundColor: styles.$tertiary }}
  >
    <Text
      style={{
        fontSize: 35,
        marginVertical: 20,
        alignSelf: 'center',
        color: styles.$textColor,
        fontFamily: Fonts.type.bold,
        backgroundColor: 'transparent',
      }}
    >
      SwoleMate
    </Text>
    <DrawerItems
      {...props}
      inactiveTintColor="#BEC3C7"
      activeTintColor={styles.$primary}
      labelStyle={{ fontFamily: 'Exo-Bold', fontSize: 16 }}
    />
  </SafeAreaView>
);

export default connect(({ auth }) => auth)(Drawer);
