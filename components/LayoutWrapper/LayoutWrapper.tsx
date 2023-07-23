'use client';
import {ReactNode} from 'react';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import getColorsForCssVars from '@/utilities/getColorsForCssVars';

import css from './LayoutWrapper.module.css';

type Props = {
  children: ReactNode;
};

const LayoutWrapper = (props: Props) => {
  const {
    colorSchemeState: {activeColorScheme, lightness},
  } = useColorSchemes();
  const colorsForCssVars = getColorsForCssVars(activeColorScheme);
  return (
    <div
      className={css.container}
      data-lightness={lightness}
      style={colorsForCssVars}
    >
      {props.children}
    </div>
  );
};

export default LayoutWrapper;
