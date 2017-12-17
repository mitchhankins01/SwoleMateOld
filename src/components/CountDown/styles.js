import themes from '../../components/theme';

const themeStyles = themes.createStyleSheet({
  countDownContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  countDownContainerAnimated: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  countDownIcon: {
    top: 100,
    position: 'absolute',
    color: '$primaryColor',
  },
  countDownText: {
    fontSize: 80,
    alignSelf: 'center',
    position: 'absolute',
    color: '$primaryColor',
    fontFamily: 'Exo-Bold',
  },
  lastSetViewContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  lastSetViewText: {
    paddingTop: 30,
    fontSize: 40,
    alignSelf: 'center',
    position: 'absolute',
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
  },
});

export default themeStyles;
