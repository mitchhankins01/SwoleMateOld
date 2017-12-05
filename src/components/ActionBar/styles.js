import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  actionBar: {
    left: 30,
    right: 30,
    bottom: 20,
    height: 50,
    elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    shadowOpacity: 1,
    position: 'absolute',
    flexDirection: 'row',
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    backgroundColor: '$secondaryColor',
    shadowOffset: { width: 2, height: 2 },
  },
  actionBarView: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default themeStyles;
