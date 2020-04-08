export type validThemeType = {
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

export type validKeysType = Array<
  | 'name'
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white'
  | 'brightBlack'
  | 'brightRed'
  | 'brightGreen'
  | 'brightYellow'
  | 'brightBlue'
  | 'brightPurple'
  | 'brightCyan'
  | 'brightWhite'
  | 'background'
  | 'foreground'
>;

export type themeType = validThemeType & {isDark: boolean};

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
  initialTheme?: string;
};

type setThemeType = {
  type: 'SET';
  theme: string;
};

type setScreenSizeType = {
  type: 'SIZE';
  isSmallScreenSize: boolean;
};

type setScreenSizeType = {
  type: 'SHADE';
  themeShade: themeShadeType;
};

export type actionTypes =
  | loadActionType
  | setTheme
  | setScreenSizeType
  | setScreenSizeType;
