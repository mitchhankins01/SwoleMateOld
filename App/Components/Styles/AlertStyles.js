import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts, Constants } from '../../Themes/';

export default EStyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 500,
    elevation: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    zIndex: 500,
    height: 250,
    elevation: 5,
    alignSelf: 'center',
    position: 'absolute',
    width: Constants.DEV_WIDTH,
    backgroundColor: '$tertiaryColor',
    marginTop: Constants.DEV_HEIGHT * 0.35,
  },
  title: {
    marginTop: 15,
    alignSelf: 'center',
    color: '$text',
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.bold,
  },
  message: {
    marginTop: 10,
    color: '$text',
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 15,
    borderColor: '$primaryColor',
  },
  icon: {
    color: '$primaryColor',
  },
});
