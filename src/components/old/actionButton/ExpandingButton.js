import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from 'color';
//import { renderAllPrograms } from '../program';
import ActionButton from './ActionButton';

const icon = (styles, type, showAllPrograms) => {
  let iconName = 'grid';
  if (showAllPrograms) {
    iconName = 'dots-three-vertical';
  } else if (type === 'primaryProgramDetails') {
    iconName = 'dots-three-vertical';
  }

  return (
    <Entypo
      name={iconName}
      color={styles.$tertiaryColor}
      size={35}
    />
  );
};

class ExpandingButton extends Component {
  buttonConfigMain = [
    {
      iconType: Entypo,
      icon: 'list',
      onPress: this.props.onPressShowAllPrograms,
    },
    {
      iconType: Entypo,
      icon: 'edit',
      onPress: () => {},
    },
    {
      iconType: Entypo,
      icon: 'rocket',
      onPress: () => {},
    },
  ];

  buttonConfigPrimaryProgramDetails = [
    {
      iconType: Entypo,
      icon: 'back',
      onPress: this.props.showPrimaryButton
    },
    {
      iconType: Entypo,
      icon: 'add-to-list',
      onPress: this.props.onPressAddNewProgram,
    },
    {
      iconType: Entypo,
      icon: 'trash',
      onPress: () => console.log(this.props.program),
    },
  ];

  buttonConfigAllPrograms = [
    {
      iconType: Entypo,
      icon: 'back',
      onPress: this.props.showPrimaryButton
    },
    {
      iconType: Entypo,
      icon: 'add-to-list',
      onPress: this.props.onPressAddNewProgram,
    },
    {
      iconType: Entypo,
      icon: 'trash',
      onPress: () => console.log(this.props.program),
    },
  ];

  buttonConfigAllProgramsDetails = [
    {
      iconType: Entypo,
      icon: 'back',
      onPress: () => {}//renderAllPrograms(this.props.dispatch, !this.props.program.showAll),
    },
    {
      iconType: Entypo,
      icon: 'add-to-list',
      onPress: this.props.onPressAddNewProgramDay,
    },
    {
      iconType: Entypo,
      icon: 'trash',
      onPress: () => console.log(this.props.program),
    },
  ];

  renderContentSwitch(styles, type) {
    switch (type) {
      case 'main':
        return this.renderContent(styles, this.buttonConfigMain);
      case 'primaryProgramDetails':
        return this.renderContent(styles, this.buttonConfigPrimaryProgramDetails);
      case 'allPrograms':
        return this.renderContent(styles, this.buttonConfigAllPrograms);
      case 'allProgramsDetails':
        return this.renderContent(styles, this.buttonConfigAllProgramsDetails);
      default:
        return;
    }
  }

  renderContent(styles, buttonConfig) {
    return (
      buttonConfig.map((item, i) => (
        <ActionButton.Item
          buttonColor={styles.$primaryColor}
          title={item.title}
          onPress={item.onPress}
          key={i}
          size={50}
        >
          <item.iconType
            name={item.icon}
            color={styles.$tertiaryColor}
            size={25}
            //style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
      ))
    );
  }

  render() {
    const { styles, type, showAllPrograms } = this.props;
    const bgColor = Color(styles.$primaryColor).alpha(0.5);

    return (
      <ActionButton
        icon={icon(styles, type, showAllPrograms)}
        bgColor={bgColor.toString()}
        buttonColor={styles.$secondaryColor}
      >
        {this.renderContentSwitch(styles, type)}
      </ActionButton>
    );
  }
}

export default ExpandingButton;
