import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create({
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  $tertiary: '$tertiaryColor',
  container: {
    flex: 1,
  },
  emptyText: {
    padding: 20,
    marginTop: 30,
    color: '$text',
    alignSelf: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
    backgroundColor: '$secondaryColor',
  },
});
