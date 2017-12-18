import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  calendarContainer: {
    margin: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 1,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
});

export default themeStyles;
