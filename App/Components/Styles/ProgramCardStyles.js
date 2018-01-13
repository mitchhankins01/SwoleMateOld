import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

export default StyleSheet.create({
  // Program Card
  container: {
    height: 100,
    elevation: 5,
    marginTop: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, 1)',
    backgroundColor: Colors.bgColor,
    borderColor: Colors.primaryColor,
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
    color: Colors.text,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
  subtitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.text,
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
    shadowColor: 'rgba(0,0,0, 1)',
    backgroundColor: Colors.bgColor,
    borderColor: Colors.primaryColor,
    shadowOffset: { height: 0, width: 0 },
  },
});
