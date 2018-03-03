import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create( {
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginBottom: 84,
  },
} );
