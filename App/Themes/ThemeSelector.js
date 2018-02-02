const standard = {
  text: '#EDF0F1',
  primaryColor: '#70B2F9',
  tertiaryColor: '#38597C',
  secondaryColor: '#4872A0',
  bgColor: 'rgba(0, 0, 0, 0.1)',
};

const standard2 = {
  text: '#EDF0F1',
  primaryColor: '#CD83F8',
  secondaryColor: '#925EB1',
  tertiaryColor: '#67427B',
  bgColor: 'rgba(0, 0, 0, 0.1)',
};

const standard3 = {
  text: '#EDF0F1',
  primaryColor: '#E69435',
  secondaryColor: '#C56F28',
  tertiaryColor: '#AA521E',
  bgColor: 'rgba(0, 0, 0, 0.1)',
};

const selector = (theme) => {
  switch (theme) {
    default:
      return standard;
    case 'standard':
      return standard;
    case 'standard2':
      return standard2;
    case 'standard3':
      return standard3;
  }
};

export default selector;
