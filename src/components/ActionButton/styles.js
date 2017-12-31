import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  optionsView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 101,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    margin: 15,
    elevation: 3,
    borderRadius: 25,
    shadowOpacity: 0.5,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 1)',
    backgroundColor: '$primaryColor',
    shadowOffset: { height: 0, width: 0 },
  },
  iconContainer: {
    fontSize: 30,
    color: '$tertiaryColor',
  },
  optionsButton: {
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.8,
    borderColor: '$primaryColor',
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  optionsIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#EDF0F1',
  },
  optionsText: {
    fontSize: 20,
    color: '#EDF0F1',
    fontFamily: 'Exo-Medium',
  },
});

export default themeStyles;
