import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from '../../Themes/';

export default EStyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '$secondaryColor',
  },
  header: {
    flex: 1,
    color: '$text',
    marginVertical: 30,
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold,
  },
  statsView: {
    flex: 8,
  },
  overviewTitle: {
    marginTop: 20,
    color: '$text',
    alignSelf: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.bold,
  },
  overviewDetail: {
    color: '$text',
    alignSelf: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  iconContainer: {
    width: 50,
    margin: 10,
    height: 50,
    elevation: 3,
    borderWidth: 2,
    shadowRadius: 2,
    borderRadius: 15,
    shadowOpacity: 0.8,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 35,
    color: '$primaryColor',
  },
});
