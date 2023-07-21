import {colorSchemeAndMeta} from '@/types';
import {CSSProperties} from 'react';

interface StyleProps extends CSSProperties {
  '--black': string;
  '--red': string;
  '--green': string;
  '--yellow': string;
  '--blue': string;
  '--purple': string;
  '--cyan': string;
  '--white': string;
  '--brightBlack': string;
  '--brightRed': string;
  '--brightGreen': string;
  '--brightYellow': string;
  '--brightBlue': string;
  '--brightPurple': string;
  '--brightCyan': string;
  '--brightWhite': string;
  '--background': string;
  '--foreground': string;
  '--cursorColor'?: string;
  '--selectionBackground'?: string;
}

const getColorsForCssVars = (colorScheme: colorSchemeAndMeta): StyleProps => {
  return {
    '--black': colorScheme.black,
    '--red': colorScheme.red,
    '--green': colorScheme.green,
    '--yellow': colorScheme.yellow,
    '--blue': colorScheme.blue,
    '--purple': colorScheme.purple,
    '--cyan': colorScheme.cyan,
    '--white': colorScheme.white,
    '--brightBlack': colorScheme.brightBlack,
    '--brightRed': colorScheme.brightRed,
    '--brightGreen': colorScheme.brightGreen,
    '--brightYellow': colorScheme.brightYellow,
    '--brightBlue': colorScheme.brightBlue,
    '--brightPurple': colorScheme.brightPurple,
    '--brightCyan': colorScheme.brightCyan,
    '--brightWhite': colorScheme.brightWhite,
    '--background': colorScheme.background,
    '--foreground': colorScheme.foreground,
    '--cursorColor': colorScheme.cursorColor,
    '--selectionBackground': colorScheme.selectionBackground,
  };
};

export default getColorsForCssVars;
