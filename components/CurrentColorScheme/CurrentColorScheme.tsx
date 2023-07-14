// display all the properties of the current color scheme, with a box next to the colours with that colour
// Compare this snippet from components/ColorSchemeSelector/ColorSchemeSelector.tsx:
// // react component, displays all the color schemes
'use client';
import {CSSProperties, ReactNode} from 'react';

import {colorSchemeAndMeta} from '@/types';
import css from './CurrentColorScheme.module.css';
import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

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

type Props = {
  children: ReactNode;
};

const CurrentColorScheme = (props: Props) => {
  const {colorSchemeState} = useColorSchemes();
  const colorsForCssVars = getColorsForCssVars(
    colorSchemeState.currentColorScheme
  );

  return (
    <div className={css.container} style={colorsForCssVars}>
      <h2>{colorSchemeState.currentColorScheme.name}</h2>
      {props.children}
    </div>
  );
};

export default CurrentColorScheme;
