// test for getColorSchemes.ts
import getColorSchemes from './getColorSchemes';
import {colorSchemeAndMeta} from '@/types';

const themeA: colorSchemeAndMeta = {
  name: '3024 Day',
  black: '#090300',
  red: '#db2d20',
  green: '#01a252',
  yellow: '#fded02',
  blue: '#01a0e4',
  purple: '#a16a94',
  cyan: '#b5e4f4',
  white: '#a5a2a2',
  brightBlack: '#5c5855',
  brightRed: '#e8bbd0',
  brightGreen: '#3a3432',
  brightYellow: '#4a4543',
  brightBlue: '#807d7c',
  brightPurple: '#d6d5d4',
  brightCyan: '#cdab53',
  brightWhite: '#f7f7f7',
  background: '#f7f7f7',
  foreground: '#4a4543',
  cursorColor: '#4a4543',
  selectionBackground: '#a5a2a2',
  meta: {
    isDark: false,
    credits: [
      {
        name: '0x3024',
        link: 'https://github.com/0x3024',
      },
    ],
  },
};

const themeB: colorSchemeAndMeta = {
  name: '3024 Night',
  black: '#090300',
  red: '#db2d20',
  green: '#01a252',
  yellow: '#fded02',
  blue: '#01a0e4',
  purple: '#a16a94',
  cyan: '#b5e4f4',
  white: '#a5a2a2',
  brightBlack: '#5c5855',
  brightRed: '#e8bbd0',
  brightGreen: '#3a3432',
  brightYellow: '#4a4543',
  brightBlue: '#807d7c',
  brightPurple: '#d6d5d4',
  brightCyan: '#cdab53',
  brightWhite: '#f7f7f7',
  background: '#090300',
  foreground: '#a5a2a2',
  cursorColor: '#a5a2a2',
  selectionBackground: '#4a4543',
  meta: {
    isDark: true,
    credits: [
      {
        name: '0x3024',
        link: 'https://github.com/0x3024',
      },
    ],
  },
};

const themes = [themeA, themeB];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(themes),
  })
) as jest.Mock;

test('getColorSchemes', async () => {
  const colorSchemes = await getColorSchemes();
  expect(colorSchemes).toEqual(themes);
});
