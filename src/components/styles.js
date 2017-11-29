import { Dimensions } from 'react-native';
import themes from './theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    height: DEVICE_HEIGHT * 0.53,
    justifyContent: 'space-around',
    backgroundColor: '$secondaryColor',
  },
  loadingText: {
    fontSize: 40,
    alignSelf: 'center',
    color: '$primaryColor',
    fontFamily: 'Exo-Bold',
    backgroundColor: 'transparent',
  },
  loadingTextSub: {
    fontSize: 30,
    marginBottom: 10,
    alignSelf: 'center',
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  appName: {
    fontSize: 40,
    color: '#FFF',
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'Exo-Bold',
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '400',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  actionBar: {
    left: 20,
    right: 20,
    bottom: 20,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    //justifyContent: 'space-around',
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
  formLabel: {
    backgroundColor: 'transparent',
  },
  formLabelText: {
    fontSize: 18,
    fontFamily: 'Exo-Medium',
    fontWeight: '400',
    color: '#FFF',
  },
  input: {
    fontFamily: 'Exo-Regular',
    color: '#FFF',
    paddingLeft: 10,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  errorTextStyle: {
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent',
    fontFamily: 'Exo-Bold',
  },
  buttonGroup: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderColor: '#EDF0F1',
    borderWidth: 0,
    width: '90%',
    alignSelf: 'center',
  },
  buttonGroupText: {
    color: '#FFF',
    fontFamily: 'Exo-Medium',
    fontSize: 16,
  },
  list: {
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.1,
    borderTopColor: '$primaryColor',
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  listItem: {
    height: 80,
    justifyContent: 'center',
    borderBottomColor: '$primaryColor'
  },
  listItemSettingsTitle: {
    fontFamily: 'Exo-Medium',
    color: '$tertiaryColor',
  },
  listItemProgramsTitle: {
    fontFamily: 'Exo-Medium',
    color: '$tertiaryColor',
    alignSelf: 'center',
    marginLeft: -10,
    fontSize: 18
  },
  listItemProgramsSubtitle: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    fontFamily: 'exo',
    paddingTop: 5,
    fontSize: 14,
  },
  listItemIcon: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    paddingLeft: 10
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
  },
  programIcon: {
    backgroundColor: '$tertiaryColor',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  programDay: {
    fontFamily: 'Exo-Bold',
    fontSize: 25,
    color: '$primaryColor'
  },
  popup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupTitle: {
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    fontSize: 20,
  },
  popupTitleContainer: {
    backgroundColor: '$secondaryColor',
    borderBottomWidth: 0,
  },
  popupDropdown: {
    backgroundColor: '$tertiaryColor',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: DEVICE_WIDTH * 0.7,
    borderRadius: 5,
    height: 30,
  },
  popupDropdownText: {
    backgroundColor: 'transparent',
    fontFamily: 'Exo-Medium',
    color: '$primaryColor',
    width: DEVICE_WIDTH * 0.7,
    marginLeft: 5,
    fontSize: 14,
    borderWidth: 0,
  },
  popupLabel: {
    backgroundColor: '$tertiaryColor',
    fontFamily: 'Exo-Medium',
    color: '$primaryColor',
    fontSize: 16,
    width: 200,
  },
  popupInputContainer: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.7,
    marginBottom: 5,
    borderRadius: 5,
  },
  popupInput: {
    color: '$primaryColor',
    fontFamily: 'Exo-Regular',
    fontSize: 16,
  },
  popupButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  popupText: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  popupButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: '$secondaryColor',
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    color: '$secondaryColor',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
});

export default themeStyles;
