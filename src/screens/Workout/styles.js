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
  countDownContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDownText: {
    fontSize: 50,
    alignSelf: 'center',
    position: 'absolute',
    color: '$primaryColor',
    fontFamily: 'Exo-Bold',
  },
});

export default themeStyles;
