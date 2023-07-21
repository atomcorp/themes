'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';
import RadioButtons from '@/components/RadioButtons/RadioButtons';
import RadioButton from '@/components/RadioButtons/RadioButton';

const ToggleLightness = () => {
  const {
    colorSchemeState: {lightness},
    setLightness,
  } = useColorSchemes();

  return (
    <RadioButtons
      label="Toggle light or dark color schemes"
      value={lightness}
      handleChange={(value: string) => {
        if (value === 'dark' || value === 'light') {
          setLightness(value);
        }
      }}
    >
      <RadioButton value="dark">Dark</RadioButton>
      <RadioButton value="light">Light</RadioButton>
    </RadioButtons>
  );
};

export default ToggleLightness;
