import { StyleSheet } from 'react-native';
import { Fonts } from '../../Themes/';

export default StyleSheet.create({
  // Program Card
  container: {
    height: 70,
    elevation: 5,
    marginBottom: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
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
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
});
