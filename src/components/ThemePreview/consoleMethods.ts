import {
  backgroundKeyType,
  textKeyType,
  validThemeType,
  themeType,
  validKeysType,
} from 'types';

export const backgroundKeys: backgroundKeyType[] = [
  'background',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
  'background',
];

export const textKeys: textKeyType[] = [
  'black',
  'brightBlack',
  'red',
  'brightRed',
  'green',
  'brightGreen',
  'yellow',
  'brightYellow',
  'blue',
  'brightBlue',
  'purple',
  'brightPurple',
  'cyan',
  'brightCyan',
  'white',
  'brightWhite',
];

export const validKeys: validKeysType = [
  'name',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
  'brightBlack',
  'brightRed',
  'brightGreen',
  'brightYellow',
  'brightBlue',
  'brightPurple',
  'brightCyan',
  'brightWhite',
  'background',
  'foreground',
];

// this just keeps Typescript happy
const initThemeObj = {
  name: '',
  black: '',
  red: '',
  green: '',
  yellow: '',
  blue: '',
  purple: '',
  cyan: '',
  white: '',
  brightBlack: '',
  brightRed: '',
  brightGreen: '',
  brightYellow: '',
  brightBlue: '',
  brightPurple: '',
  brightCyan: '',
  brightWhite: '',
  background: '',
  foreground: '',
};

export const parseValidKeys = (theme: themeType): validThemeType => {
  return validKeys.reduce(
    (acc, key) => ({
      ...acc,
      ...{
        [key]: theme[key],
      },
    }),
    initThemeObj
  );
};
