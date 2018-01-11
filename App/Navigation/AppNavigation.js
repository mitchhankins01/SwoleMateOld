import { StackNavigator } from 'react-navigation'
import Programs from '../Containers/Programs'

// import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Programs: { screen: Programs }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Programs',
  navigationOptions: {
    // headerStyle: styles.header
  }
})

export default PrimaryNav
