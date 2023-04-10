export type colorScheme = {
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
  cursorColor?: string;
  selectionBackground?: string;
};

type creditType = {
  name: 'string';
  link: 'string';
};
type metaType = {
  meta: {isDark: boolean; credits?: creditType[]};
};

export type colourShemeAndMeta = colorScheme & metaType;

export type Lightness = 'light' | 'dark';
