import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

export const textColor = Colors.text;
export const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    padding: 20,
    marginTop: 30,
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
    backgroundColor: Colors.secondaryColor,
  },
});
