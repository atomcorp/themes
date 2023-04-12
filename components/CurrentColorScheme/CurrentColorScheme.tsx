// display all the properties of the current color scheme, with a box next to the colours with that colour
// Compare this snippet from components/ColorSchemeSelector/ColorSchemeSelector.tsx:
// // react component, displays all the color schemes
'use client';
import {CSSProperties} from 'react';

import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';
import useDefinedContext from '@/utilities/useDefinedContext';
import css from './CurrentColorScheme.module.css';
import ChalkExample from '@/components/CurrentColorScheme/CodeExamples/ChalkExample';

const getColorsOnlyFromSchemeAndMeta = (colorScheme: colorSchemeAndMeta) => {
  const {name, meta, ...colorSchemeColors} = colorScheme;
  return colorSchemeColors;
};

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

const CurrentColorScheme = () => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const currentColors = getColorsOnlyFromSchemeAndMeta(currentColorScheme);
  const colorsForCssVars = getColorsForCssVars(currentColorScheme);

  return (
    <div className={css.container} style={colorsForCssVars}>
      <h2>{currentColorScheme.name}</h2>
      <ChalkExample />
      <ul>
        {Object.entries(currentColors).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
            <div
              className={css[key]}
              style={{
                width: '100px',
                height: '1rem',
                display: 'inline-block',
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentColorScheme;
