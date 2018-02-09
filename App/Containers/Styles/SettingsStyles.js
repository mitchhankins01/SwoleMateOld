import { Fonts } from '../../Themes/';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    margin: 15,
    borderWidth: 2,
    marginBottom: 85,
    backgroundColor: '$bgColor',
    borderColor: '$primaryColor',
  },
  textInput: {
    height: 40,
    width: 300,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    color: '#EDF0F1',
    alignSelf: 'center',
    borderColor: '$primaryColor',
    fontFamily: Fonts.type.regular,
    backgroundColor: '$tertiaryColor',
  },
});
