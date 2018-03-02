import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Drawer from './Drawer';
import Logs from '../Containers/Logs';
import Login from '../Containers/Login';
import Workout from '../Containers/Workout';
import Settings from '../Containers/Settings';
import Programs from '../Containers/Programs';
import EditProgram from '../Containers/EditProgram';
// import styles from './Styles/NavigationStyles'

function getIcon( selected, unselected ) {
  return {
    drawerIcon: ( { tintColor, focused } ) => (
      <Icon size={ 26 } type="ionicon" color={ tintColor } name={ focused ? selected : unselected } />
    ),
  };
}

const PrimaryNav = StackNavigator(
  {
    Login: { screen: Login },
    HomeStack: {
      screen: DrawerNavigator(
        {
          Programs: {
            screen: Programs,
            navigationOptions: getIcon( 'ios-home', 'ios-home-outline' ),
          },
          Logs: {
            screen: Logs,
            navigationOptions: getIcon( 'ios-calendar', 'ios-calendar-outline' ),
          },
          Settings: {
            screen: Settings,
            navigationOptions: getIcon( 'ios-settings', 'ios-settings-outline' ),
          },
          EditProgram: {
            screen: EditProgram,
            navigationOptions: { drawerLabel: () => null },
          },
          Workout: {
            screen: Workout,
            navigationOptions: { drawerLabel: () => null },
          },
        },
        {
          headerMode: 'none',
          contentComponent: Drawer,
          drawerOpenRoute: 'DrawerOpen',
          drawerCloseRoute: 'DrawerClose',
          drawerToggleRoute: 'DrawerToggle',
        },
      ),
    },
  },
  {
    headerMode: 'none',
  },
);

export default PrimaryNav;
