import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Programs from '../Containers/Programs';
import Login from '../Containers/Login';

import Drawer from './Drawer';
// import styles from './Styles/NavigationStyles'

const PrimaryNav = StackNavigator(
  {
    Login: { screen: Login },
    HomeStack: {
      screen: DrawerNavigator(
        {
          Programs: { screen: Programs },
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
