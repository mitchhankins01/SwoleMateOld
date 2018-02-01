import { StyleSheet } from 'react-native';
import { Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    padding: 20,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
  },
});
