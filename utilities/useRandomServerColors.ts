/**
 * On the server and on 1st client render we do not want to randomise the
 * colors order, as it will error with a Next.js mismatch.
 * see: https://nextjs.org/docs/messages/react-hydration-error
 *
 * So what we do here is just store the first color scheme name,
 * which will be the same on the server and on the first client render, then
 * flag when the color scheme changes, and starts randomising the color order.
 *
 * useEffect etc, will result in an extra rerender, which will leave a
 * glitchy effect as the 2 different sets of colors are rendered.
 */

import {colorSchemeAndMeta} from '@/types';
import {useRef} from 'react';

const getColors = (
  colorScheme: colorSchemeAndMeta,
  isRandom: boolean
): string[] => {
  if (colorScheme) {
    return [
      colorScheme.red,
      colorScheme.green,
      colorScheme.yellow,
      colorScheme.blue,
      colorScheme.purple,
      colorScheme.cyan,
    ]
      .sort(() => (isRandom ? Math.random() - 0.5 : 0))
      .slice(0, 5);
  }
  return [];
};

const useRandomColors = (currentColorScheme: colorSchemeAndMeta): string[] => {
  const currentColorSchemeRender = useRef({
    hasColorSchemeChanged: false,
    initialColorSchemeName: currentColorScheme.name,
  });

  if (!currentColorSchemeRender.current.hasColorSchemeChanged) {
    if (
      currentColorScheme.name !==
      currentColorSchemeRender.current.initialColorSchemeName
    ) {
      currentColorSchemeRender.current.hasColorSchemeChanged = true;
    }
  }

  const colors = getColors(
    currentColorScheme,
    currentColorSchemeRender.current.hasColorSchemeChanged
  );

  return colors;
};

export default useRandomColors;
