import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
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
    height: 40,
    borderWidth: 1,
    marginBottom: 40,
    color: Colors.text,
    paddingHorizontal: 20,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.secondaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
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
