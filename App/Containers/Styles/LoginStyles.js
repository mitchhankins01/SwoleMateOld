import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'center',
  },
  appName: {
    marginBottom: 10,
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold,
  },
  header: {
    marginBottom: 40,
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.medium,
  },
  input: {
    marginBottom: 40,
    height: 40,
    color: Colors.text,
    paddingHorizontal: 20,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    backgroundColor: Colors.secondaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
  },
  buttonText: {
    color: Colors.text,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
  },
});
