import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Fonts } from '../Themes';

const styles = EStyleSheet.create({
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
  container: {
    color: '$text',
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold,
  },
});

const Loading = () => {
  const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
  return (
    <LinearGradient
      colors={gradients}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={styles.container}>Loading</Text>
    </LinearGradient>
  );
};

export default Loading;
