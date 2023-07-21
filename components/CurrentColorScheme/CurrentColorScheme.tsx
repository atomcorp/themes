// display all the properties of the current color scheme, with a box next to the colours with that colour
// Compare this snippet from components/ColorSchemeSelector/ColorSchemeSelector.tsx:
// // react component, displays all the color schemes
'use client';
import {CSSProperties, ReactNode} from 'react';

import {colorSchemeAndMeta} from '@/types';
import css from './CurrentColorScheme.module.css';
import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';
import getColorsForCssVars from '@/utilities/getColorsForCssVars';

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
      {props.children}
    </div>
  );
};

export default CurrentColorScheme;
