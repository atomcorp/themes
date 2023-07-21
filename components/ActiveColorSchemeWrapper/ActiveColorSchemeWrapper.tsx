// display all the properties of the current color scheme, with a box next to the colours with that colour
// Compare this snippet from components/ColorSchemeSelector/ColorSchemeSelector.tsx:
// // react component, displays all the color schemes
'use client';
import {ReactNode} from 'react';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import getColorsForCssVars from '@/utilities/getColorsForCssVars';

type Props = {
  children: ReactNode;
};

const ActiveColorSchemeWrapper = (props: Props) => {
  const {
    colorSchemeState: {activeColorScheme},
  } = useColorSchemes();
  const colorsForCssVars = getColorsForCssVars(activeColorScheme);

  return <div style={colorsForCssVars}>{props.children}</div>;
};

export default ActiveColorSchemeWrapper;
