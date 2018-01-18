import { StyleSheet } from "react-native";
import { Fonts, Colors, Constants } from "../../Themes/";

export const textColor = Colors.text;
export const gradients = [
  Colors.primaryColor,
  Colors.secondaryColor,
  Colors.tertiaryColor
];

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    justifyContent: "center"
  },
  appName: {
    marginBottom: 10,
    color: Colors.text,
    alignSelf: "center",
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.bold
  },
  header: {
    marginBottom: 40,
    color: Colors.text,
    alignSelf: "center",
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.medium
  },
  input: {
    height: 40,
    marginBottom: 40,
    color: Colors.text,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    borderColor: Colors.primaryColor
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: Colors.primaryColor
  },
  buttonText: {
    color: Colors.text,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium
  },
  icon: {
    marginRight: 10,
    color: Colors.text,
    fontSize: Fonts.size.h6
  },
  progress: {
    marginBottom: 10,
    alignSelf: "center",
    width: Constants.DEV_WIDTH * 0.9
  }
});
