import {colourShemeAndMeta} from '@/types';

export const getNextPrevColorScheme = (
  colorSchemes: colourShemeAndMeta[],
  currentColorScheme: string,
  direction: 'next' | 'prev'
) => {
  const currentIndex = colorSchemes.findIndex(
    (colorScheme) => colorScheme.name === currentColorScheme
  );
  if (currentIndex === -1) {
    throw new Error('currentColorScheme not found in colorSchemes');
  }
  const nextIndex =
    direction === 'next'
      ? (currentIndex + 1) % colorSchemes.length
      : (currentIndex - 1 + colorSchemes.length) % colorSchemes.length;
  return colorSchemes[nextIndex].name;
};

export const colorSchemesFilteredByCurrentLightness = (
  colorSchemes: colourShemeAndMeta[],
  lightnessIsDark: boolean
) => {
  return colorSchemes.filter(
    (colorScheme) => colorScheme.meta.isDark === lightnessIsDark
  );
};
