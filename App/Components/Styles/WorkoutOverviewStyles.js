import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

export default StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
  },
  header: {
    flex: 1,
    marginVertical: 30,
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold,
  },
  statsView: {
    flex: 8,
  },
  overviewTitle: {
    marginTop: 20,
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.bold,
  },
  overviewDetail: {
    color: Colors.text,
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
    borderRadius: 25,
    shadowOpacity: 0.8,
    borderColor: Colors.primaryColor,
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 35,
    color: Colors.primaryColor,
  },
});
