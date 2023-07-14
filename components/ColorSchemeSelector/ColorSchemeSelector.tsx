'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

const ColorSchemeSelector = () => {
  const {colorSchemeState, setCurrentColorScheme} = useColorSchemes();

  const colorSchemes =
    colorSchemeState.currentLightness === 'dark'
      ? colorSchemeState.darkColorSchemes
      : colorSchemeState.lightColorSchemes;

  return (
    <select
      value={colorSchemeState.currentColorScheme.name}
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
