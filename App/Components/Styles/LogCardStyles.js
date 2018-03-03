import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create( {
  $textColor: '$text',
  $primary: '$primaryColor',
  $secondary: '$secondaryColor',
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  logTitle: {
    color: '$text',
    alignSelf: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
  sectionTitle: {
    color: '$text',
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
} );
