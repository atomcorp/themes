'use client';

import {
  CurrentColorSchemeContext,
  CurrentLightnessContext,
  DarkColorSchemesContext,
  LightColorSchemesContext,
  SetCurrentColorSchemeContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import useDefinedContext from '@/utilities/useDefinedContext';

const ColorSchemeSelector = () => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const setCurrentColorScheme = useDefinedContext(SetCurrentColorSchemeContext);
  const currentLightness = useDefinedContext(CurrentLightnessContext);
  const darkColorSchemes = useDefinedContext(DarkColorSchemesContext);
  const lightColorSchemes = useDefinedContext(LightColorSchemesContext);

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
