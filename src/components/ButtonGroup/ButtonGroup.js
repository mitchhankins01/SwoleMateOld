import React from 'react';
import { inject, observer } from 'mobx-react';
import { ButtonGroup } from 'react-native-elements';

import themeStyles from './styles';

const handlePress = ({ programStore: { updateScreenIndex } }, index) => {
  switch (index) {
    default: return;
    case 0: return updateScreenIndex('allPrograms');
    case 1: return updateScreenIndex('primaryProgram');
    case 2: return null;
  }
};

export default inject('programStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const { screenIndex, showUpdateForm } = props.programStore;
  const getIndex = () => {
    switch (screenIndex) {
      default: return null;
      case 'allPrograms': return 0;
      case 'primaryProgram':
      case 'selectedProgram': return 1;
    }
  };

  if (showUpdateForm) return null;

  switch (screenIndex) {
    default: return null;
    case 'allPrograms':
    case 'primaryProgram':
    case 'selectedProgram':
      return (
        <ButtonGroup
          selectedIndex={getIndex()}
          underlayColor='transparent'
          textStyle={styles.buttonText}
          onPress={index => handlePress(props, index)}
          containerStyle={styles.containerStyle}
          selectedBackgroundColor={styles.$secondaryColor}
          buttons={['All Programs', 'Selected', 'Discover']}
          innerBorderStyle={{ width: 0, color: styles.$primaryColor }}
        />
      );
  }
}));
