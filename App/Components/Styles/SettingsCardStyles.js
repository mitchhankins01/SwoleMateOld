import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create({
  $textColor: '$text',
  // Program Card
  container: {
    height: 70,
    marginBottom: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
    backgroundColor: '$bgColor',
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
  },
  leftSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centerSection: {
    flex: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: '$text',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
});
