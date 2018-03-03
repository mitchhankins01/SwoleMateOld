import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create( {
  actionView: {
    left: 0,
    right: 0,
    bottom: 0,
    // If you change height, change modifyProgramHeight
    height: 70,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '$bgColor',
    borderColor: '$primaryColor',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: 50,
    margin: 15,
    height: 50,
    elevation: 1,
    borderWidth: 2,
    shadowRadius: 2,
    borderRadius: 15,
    shadowOpacity: 0.8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    fontSize: 30,
    color: '$primaryColor',
  },
} );
