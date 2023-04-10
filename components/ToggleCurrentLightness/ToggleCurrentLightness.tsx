// two buttons that toggle the current lightness
'use client';

import {useContext} from 'react';

import {
  CurrentLightnessContext,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';

const ToggleCurrentLightness = () => {
  const currentLightness = useContext(CurrentLightnessContext);
  const setCurrentLightness = useContext(SetCurrentLightnessContext);

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
