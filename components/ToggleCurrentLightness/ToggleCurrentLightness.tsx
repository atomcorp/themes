// two buttons that toggle the current lightness
'use client';

import {
  CurrentLightnessContext,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import useDefinedContext from '@/utilities/useDefinedContext';

const ToggleCurrentLightness = () => {
  const currentLightness = useDefinedContext(CurrentLightnessContext);
  const setCurrentLightness = useDefinedContext(SetCurrentLightnessContext);

  return (
    <>
      <button
        disabled={currentLightness === 'dark'}
        onClick={() => {
          setCurrentLightness('dark');
        }}
      >
        Dark
      </button>
      <button
        disabled={currentLightness === 'light'}
        onClick={() => {
          setCurrentLightness('light');
        }}
      >
        Light
      </button>
    </>
  );
};

export default ToggleCurrentLightness;
