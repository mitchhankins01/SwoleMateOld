import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { Fonts, ThemeSelector } from '../Themes';

const Loading = ({ theme }) => {
  const Colors = ThemeSelector(theme);
  const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];
  return (
    <LinearGradient
      colors={gradients}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ color: Colors.text, fontFamily: Fonts.type.bold, fontSize: Fonts.size.h1 }}>
        Loading
      </Text>
    </LinearGradient>
  );
};

export default connect(({ auth }) => auth)(Loading);
