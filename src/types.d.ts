export type initThemeType = {
  name: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  purple: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightPurple: string;
  brightCyan: string;
  brightWhite: string;
  background: string;
  foreground: string;
};

export type themeType = themeType & {isDark: boolean};

export type backgroundKeyType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white'
  | 'background';

export type textKeyType =
  | 'black'
  | 'brightBlack'
  | 'red'
  | 'brightRed'
  | 'green'
  | 'brightGreen'
  | 'yellow'
  | 'brightYellow'
  | 'blue'
  | 'brightBlue'
  | 'purple'
  | 'brightPurple'
  | 'cyan'
  | 'brightCyan'
  | 'white'
  | 'brightWhite';

type shadeType = 'LIGHT' | 'DARK';
type themeShadeType = shadeType | 'ANY';
type themeShadeObjectType = {LIGHT: 'LIGHT'; DARK: 'DARK'; ANY: 'ANY'};

type loadActionType = {
  type: 'LOAD';
  themes: themeType[];
  activeTheme: string;
};

type setThemeType = {
  type: 'SET';
  theme: string;
};

type setScreenSizeType = {
  type: 'SIZE';
  isSmallScreenSize: boolean;
};

export type actionTypes = loadActionType | setTheme | setScreenSizeType;
