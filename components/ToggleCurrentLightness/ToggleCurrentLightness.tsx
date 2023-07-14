// two buttons that toggle the current lightness
'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';
import RadioButtons from '@/components/RadioButtons/RadioButtons';
import RadioButton from '@/components/RadioButtons/RadioButton';

const lightnessItems = [
  {
    name: 'Dark',
    value: 'dark',
  },
  {
    name: 'Light',
    value: 'light',
  },
];

const ToggleCurrentLightness = () => {
  const {colorSchemeState, setCurrentLightness} = useColorSchemes();

  return (
    <RadioButtons
      label="Toggle light or dark color schemes"
      value={colorSchemeState.currentLightness}
      handleChange={(value: string) => {
        if (value === 'dark' || value === 'light') {
          setCurrentLightness(value);
        }
      }}
    >
      <RadioButton value="dark">Dark</RadioButton>
      <RadioButton value="light">Light</RadioButton>
    </RadioButtons>
  );
};

export default ToggleCurrentLightness;
