import { Fonts } from '../../Themes/';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create( {
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 85,
  },
  textInput: {
    height: 40,
    width: 300,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    color: '$text',
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: '$primaryColor',
    fontFamily: Fonts.type.regular,
    backgroundColor: '$tertiaryColor',
  },
} );
