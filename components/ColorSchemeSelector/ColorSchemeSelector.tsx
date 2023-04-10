'use client';

import {useContext} from 'react';

import {
  CurrentColorSchemeContext,
  CurrentLightnessContext,
  DarkColorSchemesContext,
  LightColorSchemesContext,
  SetCurrentColorSchemeContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';

const ColorSchemeSelector = () => {
  const currentColorScheme = useContext(CurrentColorSchemeContext);
  const setCurrentColorScheme = useContext(SetCurrentColorSchemeContext);
  const currentLightness = useContext(CurrentLightnessContext);
  const darkColorSchemes = useContext(DarkColorSchemesContext);
  const lightColorSchemes = useContext(LightColorSchemesContext);

  const colorSchemes =
    currentLightness === 'dark' ? darkColorSchemes : lightColorSchemes;

  return (
    <select
      value={currentColorScheme.name}
      onChange={(e) => {
        setCurrentColorScheme(e.target.value);
      }}
    >
      {colorSchemes.map((colorScheme) => (
        <option value={colorScheme.name} key={colorScheme.name}>
          {colorScheme.name}
        </option>
      ))}
    </select>
  );
};

export default ColorSchemeSelector;
