// write a component that deisplays the current selected theme
'use client';

import {useContext} from 'react';

import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';

const TempCurrentSelectedTheme = () => {
  const currentColorSchemeName = useContext(CurrentColorSchemeContext);
  return <h2>{currentColorSchemeName}</h2>;
};

export default TempCurrentSelectedTheme;
