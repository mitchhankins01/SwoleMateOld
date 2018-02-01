import { Fonts } from '../../Themes/';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  countDownContainer: {
    top: 0,
    flex: 1,
    left: 0,
    right: 0,
    zIndex: 2,
    bottom: 0,
    elevation: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  progressContainer: {
    top: 0,
    left: 0,
    flex: 5,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerView: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    width: 50,
    margin: 15,
    height: 50,
    elevation: 3,
    borderWidth: 2,
    shadowRadius: 2,
    borderRadius: 25,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
  },
  countDownIcon: {
    fontSize: 35,
  },
  countDownText: {
    fontSize: 80,
    alignSelf: 'center',
    position: 'absolute',
    fontFamily: Fonts.type.bold,
  },
});
