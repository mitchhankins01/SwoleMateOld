import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  actionBar: {
    left: 20,
    right: 20,
    bottom: 20,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '$secondaryColor',
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
