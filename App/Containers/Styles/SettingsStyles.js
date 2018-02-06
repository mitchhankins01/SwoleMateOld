import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

export const textColor = Colors.text;
export const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    margin: 15,
    borderWidth: 2,
    marginBottom: 85,
  },
  textInput: {
    height: 40,
    width: 300,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: Fonts.type.regular,
  },
});
