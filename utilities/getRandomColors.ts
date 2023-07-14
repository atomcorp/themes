import {colorSchemeAndMeta} from '@/types';

const getRandomColors = (colorScheme: colorSchemeAndMeta): string[] => {
  if (colorScheme) {
    return [
      colorScheme.red,
      colorScheme.green,
      colorScheme.yellow,
      colorScheme.blue,
      colorScheme.purple,
      colorScheme.cyan,
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  }
  return [];
};

export default getRandomColors;
