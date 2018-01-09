import themes from '../../components/theme';

const themeStyles = themes.createStyleSheet({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    elevation: 5,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
  },
});

export default themeStyles;
