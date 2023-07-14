'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';
import {colorSchemeAndMeta} from '@/types';

type Props = {
  darkColorSchemes: colorSchemeAndMeta[];
  lightColorSchemes: colorSchemeAndMeta[];
};

const ColorSchemeSelector = (props: Props) => {
  const {colorSchemeState, setCurrentColorScheme} = useColorSchemes();

  const colorSchemes =
    colorSchemeState.currentLightness === 'dark'
      ? props.darkColorSchemes
      : props.lightColorSchemes;

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
