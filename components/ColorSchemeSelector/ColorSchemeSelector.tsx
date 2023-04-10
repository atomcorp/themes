'use client';

import {useContext} from 'react';

import {
  CurrentColorSchemeContext,
  CurrentLightnessContext,
  SetCurrentColorSchemeContext,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colourShemeAndMeta, Lightness} from '@/types';
import {colorSchemesFilteredByCurrentLightness} from '@/utilities/colourSchemeUtilities';

type ColorSchemeSelectorProps = {
  colorSchemes: colourShemeAndMeta[];
};

const ColorSchemeSelector = (props: ColorSchemeSelectorProps) => {
  const currentColorScheme = useContext(CurrentColorSchemeContext);
  const setCurrentColorScheme = useContext(SetCurrentColorSchemeContext);
  const currentLightness = useContext(CurrentLightnessContext);

  const colorSchemes = colorSchemesFilteredByCurrentLightness(
    props.colorSchemes,
    currentLightness === 'dark'
  );

  return (
    <select
      value={currentColorScheme}
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
