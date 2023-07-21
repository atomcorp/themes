'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

const ColorSchemeSelector = () => {
  const {
    colorSchemeState: {
      lightness,
      darkColorSchemes,
      lightColorSchemes,
      activeColorScheme,
    },
    setActiveColorScheme,
  } = useColorSchemes();

  const colorSchemes =
    lightness === 'dark' ? darkColorSchemes : lightColorSchemes;

  return (
    <select
      value={activeColorScheme.name}
      onChange={(e) => {
        setActiveColorScheme(e.target.value);
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
