'use client';

import {
  CurrentColorSchemeContext,
  CurrentLightnessContext,
  SetCurrentColorSchemeContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';
import useDefinedContext from '@/utilities/useDefinedContext';

type Props = {
  darkColorSchemes: colorSchemeAndMeta[];
  lightColorSchemes: colorSchemeAndMeta[];
};

const ColorSchemeSelector = (props: Props) => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const setCurrentColorScheme = useDefinedContext(SetCurrentColorSchemeContext);
  const currentLightness = useDefinedContext(CurrentLightnessContext);

  const colorSchemes =
    currentLightness === 'dark'
      ? props.darkColorSchemes
      : props.lightColorSchemes;

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
