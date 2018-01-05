import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  containerStyle: {
    zIndex: 500,
    height: 250,
    elevation: 5,
    width: DEVICE_WIDTH,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: DEVICE_HEIGHT * 0.35,
    backgroundColor: '$tertiaryColor',
  },
  title: {
    fontSize: 30,
    color: '#EDF0F1',
    marginTop: 15,
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
  },
  message: {
    fontSize: 18,
    marginTop: 10,
    color: '#EDF0F1',
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Exo-Regular',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderColor: '#EDF0F1',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 15,
  },
});

export default themeStyles;
