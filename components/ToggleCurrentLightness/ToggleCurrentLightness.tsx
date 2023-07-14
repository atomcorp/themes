// two buttons that toggle the current lightness
'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

const ToggleCurrentLightness = () => {
  const {colorSchemeState, setCurrentLightness} = useColorSchemes();

  return (
    <>
      <button
        disabled={colorSchemeState.currentLightness === 'dark'}
        onClick={() => {
          setCurrentLightness('dark');
        }}
      >
        Dark
      </button>
      <button
        disabled={colorSchemeState.currentLightness === 'light'}
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
