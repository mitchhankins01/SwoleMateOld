import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Programs from '../Containers/Programs';
import Login from '../Containers/Login';

import Drawer from './Drawer';
// import styles from './Styles/NavigationStyles'

const PrimaryNav = DrawerNavigator(
  {
    Programs: { screen: Programs },
    LoginStack: {
      screen: StackNavigator(
        {
          Login: { screen: Login },
        },
        {
          headerMode: 'none',
        },
      ),
    },
  },
  {
    headerMode: 'none',
    contentComponent: Drawer,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

export default PrimaryNav;
