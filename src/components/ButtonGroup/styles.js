import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  containerStyle: {
    height: 50,
    elevation: 3,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.9,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  buttonText: {
    color: '#EDF0F1',
    fontFamily: 'Exo-Regular',
  },
});

export default themeStyles;
