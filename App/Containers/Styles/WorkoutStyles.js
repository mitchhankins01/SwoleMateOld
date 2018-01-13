import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

export const textColor = Colors.text;
export const gradients = [Colors.primaryColor, Colors.secondaryColor, Colors.tertiaryColor];

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logContainer: {
    flex: 1,
    padding: 15,
    marginTop: 20,
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 5,
    shadowOpacity: 0.8,
    marginHorizontal: 15,
    shadowColor: 'rgba(0,0,0, 1)',
    borderColor: Colors.primaryColor,
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  logTextHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
  },
  inputContainer: {
    flex: 10,
    margin: 5,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.8,
    marginBottom: 75,
    shadowColor: 'rgba(0,0,0, 1)',
    borderColor: Colors.primaryColor,
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  inputHeader: {
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
  textInput: {
    margin: 5,
    padding: 3,
    fontSize: 14,
    color: '#EDF0F1',
    textAlign: 'center',
    borderBottomWidth: 1,
    fontFamily: 'Exo-Regular',
    borderColor: Colors.primaryColor,
  },
});
