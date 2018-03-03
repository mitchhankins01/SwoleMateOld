import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create( {
  $textColor: '$text',
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  sectionTitle: {
    color: '$text',
    alignSelf: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
  section: {
    padding: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '$primaryColor',
    backgroundColor: '$bgColor',
  },
} );
