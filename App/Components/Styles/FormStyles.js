import t from 'tcomb-form-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Constants } from '../../Themes/';

t.form.Form.stylesheet.textbox.error.color = Colors.text;
t.form.Form.stylesheet.textbox.normal.color = Colors.text;
t.form.Form.stylesheet.pickerValue.error.color = Colors.text;
t.form.Form.stylesheet.pickerValue.normal.color = Colors.text;
t.form.Form.stylesheet.controlLabel.normal.color = Colors.text;
t.form.Form.stylesheet.textbox.normal.borderColor = Colors.text;
t.form.Form.stylesheet.textbox.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.textbox.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerValue.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerValue.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.controlLabel.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.controlLabel.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerContainer.error.backgroundColor = 'transparent';
t.form.Form.stylesheet.pickerContainer.normal.backgroundColor = 'transparent';

t.form.Form.stylesheet.select.normal.color = Colors.text;
t.form.Form.stylesheet.select.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.select.error.fontFamily = Fonts.type.regular;

export default StyleSheet.create({
  formStyle: { flex: 1, padding: 30 },
  button: {
    width: 50,
    margin: 15,
    height: 50,
    elevation: 3,
    borderWidth: 2,
    shadowRadius: 2,
    borderRadius: 25,
    shadowOpacity: 0.8,
    alignSelf: 'center',
    borderColor: Colors.primaryColor,
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 30,
    color: Colors.primaryColor,
  },
});
