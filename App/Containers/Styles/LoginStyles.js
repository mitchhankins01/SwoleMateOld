import EStyleSheet from 'react-native-extended-stylesheet';

import { Fonts, Constants } from '../../Themes/';

export default EStyleSheet.create({
  $textColor: '$text',
  $primary: '$primaryColor',
  $tertiary: '$tertiaryColor',
  $secondary: '$secondaryColor',
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$secondaryColor',
  },
  appName: {
    color: '$text',
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold,
  },
  header: {
    color: '$text',
    marginBottom: 40,
    alignSelf: 'center',
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.medium,
  },
  input: {
    height: 40,
    color: '$text',
    marginBottom: 40,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    fontSize: Fonts.size.regular,
    borderColor: '$primaryColor',
    fontFamily: Fonts.type.regular,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '$primaryColor',
  },
  buttonText: {
    color: '$text',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
  },
  icon: {
    color: '$text',
    marginRight: 10,
    fontSize: Fonts.size.h6,
  },
  progress: {
    marginBottom: 10,
    alignSelf: 'center',
    width: Constants.DEV_WIDTH * 0.9,
  },
});
