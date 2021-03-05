import {validThemeType, themeType, validKeysType} from 'types';

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
  'selectionBackground',
  'cursorColor',
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
  selectionBackground: '',
  cursorColor: '',
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
