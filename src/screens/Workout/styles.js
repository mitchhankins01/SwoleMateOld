import { Dimensions } from 'react-native';
import themes from '../../components/theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  headerContainer: {
    margin: 15,
    padding: 15,
    elevation: 1,
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  inputContainer: {
    flex: 1,
    margin: 5,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  headerText: {
    fontSize: 20,
    color: '#EDF0F1',
    alignSelf: 'center',
    marginHorizontal: 10,
    fontFamily: 'Exo-Medium',
  },
  logTextHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
  },
  logTextSets: {
    fontSize: 14,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Regular',
  },
  inputHeader: {
    fontSize: 16,
    fontFamily: 'exo',
    alignSelf: 'center',
    color: '#EDF0F1',
  },
  logContainer: {
    flex: 1,
    margin: 15,
    padding: 15,
    marginTop: 0,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  spinnerText: {
    margin: 5,
    padding: 3,
    fontSize: 14,
    color: '#EDF0F1',
    textAlign: 'center',
    borderBottomWidth: 1,
    fontFamily: 'Exo-Regular',
    borderColor: '$primaryColor',
  },
  divider: {
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: '$primaryColor',
  },
  // Overview
  overviewHeaderText: {
    fontSize: 30,
    marginTop: 30,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
    backgroundColor: 'transparent',
  },
  overviewSubHeaderText: {
    fontSize: 25,
    marginBottom: 10,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  overviewInfo: {
    marginTop: 20,
    fontSize: 25,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
    backgroundColor: 'transparent',
  },
  overviewDetail: {
    fontSize: 25,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  // saveButton: {
  //   left: 40,
  //   right: 40,
  //   bottom: 20,
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   position: 'absolute',
  //   borderColor: '$primaryColor',
  //   backgroundColor: 'rgba(237, 240, 241, 0.1)',
  // },
  // saveButtonText: {
  //   padding: 10,
  //   fontSize: 25,
  //   color: '#EDF0F1',
  //   alignSelf: 'center',
  //   fontFamily: 'Exo-Medium',
  //   backgroundColor: 'transparent',
  // },
  // Dropdown
  dropdownTitle: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: -36,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
  },
  dropdownMessage: {
    fontSize: 16,
    marginLeft: -36,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
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
  actionBar: {
    top: 10,
    height: 55,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 1,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.92,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    justifyContent: 'space-around',
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  actionBarText: {
    width: 80,
    fontSize: 16,
    color: '#EDF0F1',
    fontFamily: 'exo',
    alignSelf: 'center',
  },
});

export default themeStyles;
