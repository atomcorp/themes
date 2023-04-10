import {colorSchemeAndMeta, Lightness} from '@/types';
import immer from 'immer';
import {Dispatch, useCallback} from 'react';

export type ColorSchemeState = {
  currentColorScheme: colorSchemeAndMeta;
  currentLightness: Lightness;
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
  immer(state, (draft: ColorSchemeState) => {
    switch (action.type) {
      case 'setColorScheme':
        {
          const currentColorScheme = state.colorSchemes.find(
            (colorScheme) => colorScheme.name === action.payload.colorSchemeName
          );
          if (!currentColorScheme) {
            throw new Error(
              `Color scheme ${action.payload.colorSchemeName} not found`
            );
          }
          draft.currentColorScheme = currentColorScheme;
        }
        break;
      case 'setLightness':
        {
          draft.currentLightness = action.payload.lightness;
          // reset current color scheme to first in lightness
          const currentColorSchemesByLightness =
            draft.currentLightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.currentColorScheme = currentColorSchemesByLightness[0];
        }
        break;
      case 'setNextPrevColorScheme':
        {
          const currentColorSchemesByLightness =
            draft.currentLightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.currentColorScheme = getNextPrevColorScheme(
            currentColorSchemesByLightness,
            draft.currentColorScheme.name,
            action.payload.direction
          );
        }
        break;
    }
  });

export const colorSchemeReducerInitialiser = (
  colorSchemes: colorSchemeAndMeta[]
): ColorSchemeState => {
  const lightColorSchemes = colorSchemesFilteredByCurrentLightness(
    colorSchemes,
    false
  );
  const darkColorSchemes = colorSchemesFilteredByCurrentLightness(
    colorSchemes,
    true
  );

  return {
    currentColorScheme: darkColorSchemes[0],
    currentLightness: 'dark',
    lightColorSchemes,
    darkColorSchemes,
    colorSchemes,
  };
};

export const useDispatchActions = (dispatch: Dispatch<ColorSchemeAction>) => {
  const setCurrentColorScheme = useCallback(
    (colorSchemeName: colorSchemeAndMeta['name']) => {
      dispatch({
        type: 'setColorScheme',
        payload: {
          colorSchemeName,
        },
      });
    },
    []
  );

  const setCurrentLightness = useCallback((lightness: Lightness) => {
    dispatch({
      type: 'setLightness',
      payload: {
        lightness,
      },
    });
  }, []);

  const setNextPrevColorScheme = useCallback((direction: 'next' | 'prev') => {
    dispatch({
      type: 'setNextPrevColorScheme',
      payload: {
        direction,
      },
    });
  }, []);

  return {
    setCurrentColorScheme,
    setCurrentLightness,
    setNextPrevColorScheme,
  };
};

export const getNextPrevColorScheme = (
  colorSchemes: colorSchemeAndMeta[],
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
  return colorSchemes[nextIndex];
};

export const colorSchemesFilteredByCurrentLightness = (
  colorSchemes: colorSchemeAndMeta[],
  lightnessIsDark: boolean
) => {
  return colorSchemes.filter(
    (colorScheme) => colorScheme.meta.isDark === lightnessIsDark
  );
};
