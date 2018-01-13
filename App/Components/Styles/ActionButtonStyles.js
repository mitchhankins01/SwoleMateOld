import Color from 'color';
import { StyleSheet } from 'react-native';

import { Colors } from '../../Themes/';

export default StyleSheet.create({
  actionView: {
    left: 0,
    right: 0,
    bottom: 0,
    // If you change height, change modifyProgramHeight
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    backgroundColor: Color(Colors.tertiaryColor).alpha(0.8),
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
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderColor: Colors.primaryColor,
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    fontSize: 30,
    color: Colors.primaryColor,
  },
});
