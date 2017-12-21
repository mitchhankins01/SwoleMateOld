//import { changeTheme } from '../actions/theme';
//import { changeSettingsScreen } from '../actions/settings';
import { observer } from 'mobx-react';

export const main = [
  {
    title: 'Profile',
    icon: 'account-circle'
  },
  {
    title: 'General',
    icon: 'flight-takeoff'
  },
  {
    title: 'Theme',
    icon: 'color-lens'
  },
  {
    title: 'Logout',
    icon: 'cloud-off'
  },
];

export const profileOptions = [
  {
    title: 'Name',
    icon: 'announcement'
  },
  {
    title: 'Gender',
    icon: 'pets'
  },
  {
    title: 'Email',
    icon: 'email'
  },
  {
    title: 'Password',
    icon: 'lock'
  },
  {
    title: 'Delete Account',
    icon: 'delete'
  },
  {
    title: 'Back',
    icon: 'arrow-back'
  },
];

const fetchImperial = observer(({ userStore }) => {
  if (userStore.imperial) return 'Switch to Metric System';
  return 'Switch to Metric System';
});

export const generalOptions = [
  {
    title: 'fuck',//fetchImperial(),
    icon: 'language'
  },
  {
    title: 'Back',
    icon: 'arrow-back'
  },
];

export const themes = [
  {
    title: 'Male',
    icon: 'color-lens',
    name: 'standard'
  },
  {
    title: 'Female',
    icon: 'color-lens',
    name: 'standard2'
  },
  {
    title: 'Other',
    icon: 'color-lens',
    name: 'standard3',
  },
  {
    title: 'Back',
    icon: 'arrow-back'
  },
];

export const handleProfileSelection = (i, goBack) => {
  if (i === profileOptions.length - 1) {
    return goBack();
  }

  switch (i) {

  }
};

export const handleGeneralSelection = (i, goBack) => {
  if (i === generalOptions.length - 1) {
    return goBack();
  }

  switch (i) {

  }
};
