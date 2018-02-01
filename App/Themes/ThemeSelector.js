const standard = {
  text: '#EDF0F1',
  primaryColor: '#70B2F9',
  tertiaryColor: '#38597C',
  secondaryColor: '#4872A0',
  bgColor: 'rgba(0, 0, 0, 0.15)',
};

const standard2 = {
  text: '#EDF0F1',
  primaryColor: 'red',
  tertiaryColor: 'orange',
  secondaryColor: '#4872A0',
  bgColor: 'rgba(0, 0, 0, 0.15)',
};

const selector = (theme) => {
  switch (theme) {
    default:
      return standard;
    case 'standard':
      return standard;
    case 'standard2':
      return standard2;
  }
};

export default selector;
