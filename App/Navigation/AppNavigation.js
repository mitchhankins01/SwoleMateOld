import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Drawer from './Drawer';
import Login from '../Containers/Login';
import Workout from '../Containers/Workout';
import Programs from '../Containers/Programs';
import EditProgram from '../Containers/EditProgram';
// import styles from './Styles/NavigationStyles'

const PrimaryNav = StackNavigator(
  {
    Login: { screen: Login },
    HomeStack: {
      screen: DrawerNavigator(
        {
          Programs: {
            screen: Programs,
            navigationOptions: {
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  size={26}
                  type="ionicon"
                  color={tintColor}
                  name={focused ? 'ios-home' : 'ios-home-outline'}
                />
              ),
            },
          },
          EditProgram: {
            screen: EditProgram,
            navigationOptions: {
              drawerLabel: () => null,
            },
          },
          Workout: {
            screen: Workout,
            navigationOptions: {
              drawerLabel: () => null,
            },
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
