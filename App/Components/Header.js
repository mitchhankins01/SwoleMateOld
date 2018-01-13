import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Header as NativeHeader } from 'react-native-elements';

import { Fonts, Colors } from '../Themes';

const Header = ({ dispatch, title, noMenu }) => (
  <NativeHeader
    leftComponent={
      noMenu
        ? null
        : {
            icon: 'menu',
            color: Colors.text,
            underlayColor: 'transparent',
            onPress: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
          }
    }
    centerComponent={{
      text: title,
      style: { fontFamily: Fonts.type.medium, color: Colors.text, fontSize: Fonts.size.h5 },
    }}
    /* rightComponent={{
        icon: 'exit-to-app',
        color: '#fff',
        onPress:
        onRightPress,
        underlayColor: 'transparent'
      }} */
    outerContainerStyles={{
      height: 70,
      zIndex: 100,
      elevation: 1,
      shadowOpacity: 1,
      borderBottomWidth: 0,
      shadowColor: 'rgba(0,0,0, 1)',
      backgroundColor: Colors.secondaryColor,
    }}
  />
);

const mapStateToProps = state => ({
  navigation: state.nav,
});

export default connect(mapStateToProps)(Header);
