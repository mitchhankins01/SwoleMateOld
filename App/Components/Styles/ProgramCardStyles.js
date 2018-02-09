import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create({
  $textColor: '$text',
  $primary: '$primaryColor',
  // Program Card
  container: {
    height: 100,
    elevation: 5,
    marginTop: 20,
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
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    marginTop: 5,
    color: '$text',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
  subtitle: {
    color: '$text',
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
  },
  // Modify
  modifyContainer: {
    flex: 1,
    elevation: 5,
    marginTop: 20,
    marginBottom: 75,
    borderTopWidth: 2,
    flexDirection: 'row',
    borderBottomWidth: 2,
    backgroundColor: '$bgColor',
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
  },
});
