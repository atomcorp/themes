'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

import css from './ColorSchemeSelector.module.css';

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
      className={css.select}
      value={activeColorScheme.name}
      onChange={(e) => {
        setActiveColorScheme(e.target.value);
      }}
    >
      {colorSchemes.map((colorScheme) => (
        <option
          className={css.option}
          value={colorScheme.name}
          key={colorScheme.name}
        >
          {colorScheme.name}
        </option>
      ))}
    </select>
  );
};

export default ColorSchemeSelector;
