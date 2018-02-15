import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Header as NativeHeader } from 'react-native-elements';

import { Fonts } from '../Themes';

const styles = EStyleSheet.create({
  $textColor: '$text',
  $secondary: '$secondaryColor',
  title: {
    color: '$text',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
});

const Header = ({
  dispatch, title, noMenu, theme,
}) => (
  <NativeHeader
    leftComponent={
      noMenu
        ? null
        : {
            icon: 'menu',
            color: styles.$textColor,
            underlayColor: 'transparent',
            onPress: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
          }
    }
    centerComponent={{
      text: title,
      style: styles.title,
    }}
    /* rightComponent={{
          icon: 'exit-to-app',
          color: '#fff',
          onPress:
          onRightPress,
          underlayColor: 'transparent'
        }} */
    outerContainerStyles={{
      zIndex: 2,
      height: 70,
      elevation: 1,
      shadowOpacity: 1,
      borderBottomWidth: 0,
      shadowColor: 'rgba(0,0,0, 1)',
      backgroundColor: styles.$secondary,
    }}
  />
);

export default connect(({ auth }) => auth)(Header);
