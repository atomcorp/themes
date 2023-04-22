import {colorSchemeAndMeta} from '@/types';

const filterColorSchemes = (colorSchemes: colorSchemeAndMeta[]) => {
  const lightColorSchemes: colorSchemeAndMeta[] = [];
  const darkColorSchemes: colorSchemeAndMeta[] = [];
  colorSchemes.forEach((colorScheme) => {
    if (colorScheme.meta.isDark) {
      darkColorSchemes.push(colorScheme);
    } else {
      lightColorSchemes.push(colorScheme);
    }
  });
  return {lightColorSchemes, darkColorSchemes};
};

export default filterColorSchemes;
