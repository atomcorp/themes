import {colorSchemeAndMeta, Lightness} from '@/types';
import {produce} from 'immer';
import {Dispatch, useCallback} from 'react';

export type ColorSchemeState = {
  activeColorScheme: colorSchemeAndMeta;
  lightness: Lightness;
  lightColorSchemes: colorSchemeAndMeta[];
  darkColorSchemes: colorSchemeAndMeta[];
  colorSchemes: colorSchemeAndMeta[];
};

export type ColorSchemeAction =
  | {
      type: 'setColorScheme';
      payload: {
        colorSchemeName: string;
      };
    }
  | {
      type: 'setNextPrevColorScheme';
      payload: {
        direction: 'next' | 'prev';
      };
    }
  | {
      type: 'setLightness';
      payload: {
        lightness: Lightness;
      };
    };

export const colorSchemeReducer = (
  state: ColorSchemeState,
  action: ColorSchemeAction
): ColorSchemeState =>
  produce(state, (draft: ColorSchemeState) => {
    switch (action.type) {
      case 'setColorScheme':
        {
          const activeColorScheme = state.colorSchemes.find(
            (colorScheme) => colorScheme.name === action.payload.colorSchemeName
          );
          if (!activeColorScheme) {
            throw new Error(
              `Color scheme ${action.payload.colorSchemeName} not found`
            );
          }
          draft.activeColorScheme = activeColorScheme;
        }
        break;
      case 'setLightness':
        {
          draft.lightness = action.payload.lightness;
          // reset current color scheme to first in lightness
          const activeColorSchemesByLightness =
            draft.lightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.activeColorScheme = activeColorSchemesByLightness[0];
        }
        break;
      case 'setNextPrevColorScheme':
        {
          const activeColorSchemesByLightness =
            draft.lightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.activeColorScheme = getNextPrevColorScheme(
            activeColorSchemesByLightness,
            draft.activeColorScheme.name,
            action.payload.direction
          );
        }
        break;
    }
  });

export const colorSchemeReducerInitialiser = (
  colorSchemes: colorSchemeAndMeta[]
): ColorSchemeState => {
  const lightColorSchemes = colorSchemesFilteredByLlightness(
    colorSchemes,
    false
  );
  const darkColorSchemes = colorSchemesFilteredByLlightness(colorSchemes, true);

  return {
    activeColorScheme: darkColorSchemes[0],
    lightness: 'dark',
    lightColorSchemes,
    darkColorSchemes,
    colorSchemes,
  };
};

export const useDispatchActions = (dispatch: Dispatch<ColorSchemeAction>) => {
  const setActiveColorScheme = useCallback(
    (colorSchemeName: colorSchemeAndMeta['name']) => {
      dispatch({
        type: 'setColorScheme',
        payload: {
          colorSchemeName,
        },
      });
    },
    [dispatch]
  );

  const setLightness = useCallback(
    (lightness: Lightness) => {
      dispatch({
        type: 'setLightness',
        payload: {
          lightness,
        },
      });
    },
    [dispatch]
  );

  const setNextPrevColorScheme = useCallback(
    (direction: 'next' | 'prev') => {
      dispatch({
        type: 'setNextPrevColorScheme',
        payload: {
          direction,
        },
      });
    },
    [dispatch]
  );

  return {
    setActiveColorScheme,
    setLightness,
    setNextPrevColorScheme,
  };
};

export const getNextPrevColorScheme = (
  colorSchemes: colorSchemeAndMeta[],
  activeColorScheme: string,
  direction: 'next' | 'prev'
) => {
  const currentIndex = colorSchemes.findIndex(
    (colorScheme) => colorScheme.name === activeColorScheme
  );
  if (currentIndex === -1) {
    throw new Error('activeColorScheme not found in colorSchemes');
  }
  const nextIndex =
    direction === 'next'
      ? (currentIndex + 1) % colorSchemes.length
      : (currentIndex - 1 + colorSchemes.length) % colorSchemes.length;
  return colorSchemes[nextIndex];
};

export const colorSchemesFilteredByLlightness = (
  colorSchemes: colorSchemeAndMeta[],
  lightnessIsDark: boolean
) => {
  return colorSchemes.filter(
    (colorScheme) => colorScheme.meta.isDark === lightnessIsDark
  );
};
