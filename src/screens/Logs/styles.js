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
  dateText: {
    fontSize: 22,
    color: '#EDF0F1',
    marginVertical: 15,
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  calendarButtonContainer: {
    left: 20,
    right: 20,
    bottom: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  calendarButton: {
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 1,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  calendarButtonText: {
    fontSize: 18,
    color: '#EDF0F1',
    fontFamily: 'Exo-Medium',
  },
});

export default themeStyles;
