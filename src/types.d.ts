export type themeType = {
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

export type backgroundKeyType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white';

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
