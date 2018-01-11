import { StackNavigator } from 'react-navigation';
import Programs from '../Containers/Programs';
import Login from '../Containers/Login';

// import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Programs: { screen: Programs },
  Login: { screen: Login }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Programs',
  navigationOptions: {
    // headerStyle: styles.header
  }
})

export default PrimaryNav
