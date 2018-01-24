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
    backgroundColor: Colors.bgColor,
    borderColor: Colors.primaryColor,
    shadowOffset: { height: 0, width: 0 },
  },
  logTextHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
  },
  inputContainer: {
    flex: 1,
    margin: 5,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.8,
    marginBottom: 85,
    shadowColor: 'rgba(0,0,0, 1)',
    backgroundColor: Colors.bgColor,
    borderColor: Colors.primaryColor,
    shadowOffset: { height: 0, width: 0 },
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
  logText: {
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
  logTextSets: {
    color: Colors.text,
    alignSelf: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
  },
  pastLogsContainer: {
    top: 0,
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  pastLogsHeader: {
    marginVertical: 30,
    color: Colors.text,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.bold,
  },
  pastLogsText: {
    color: Colors.text,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
  },
  pastLogsIcon: {
    fontSize: 50,
    marginBottom: 30,
    color: Colors.text,
  },
});
