import {colourShemeAndMeta, Lightness} from '@/types';
import {
  getNextPrevColorScheme,
  colorSchemesFilteredByCurrentLightness,
} from '@/utilities/colourSchemeUtilities';
import immer from 'immer';
import {Dispatch, Reducer, useCallback} from 'react';

export type ColorSchemeState = {
  currentColorScheme: string;
  currentLightness: Lightness;
  lightColorSchemes: colourShemeAndMeta[];
  darkColorSchemes: colourShemeAndMeta[];
};

export type ColorSchemeAction =
  | {
      type: 'setColorScheme';
      payload: {
        colorSchemeName: string;
      };
    }
  | {
      type: 'setPrevNextColorScheme';
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

const initState: ColorSchemeState = {
  currentColorScheme: '',
  currentLightness: 'dark',
  lightColorSchemes: [],
  darkColorSchemes: [],
};

export const colorSchemeReducer = (
  state: ColorSchemeState,
  action: ColorSchemeAction
): ColorSchemeState =>
  immer(state, (draft: ColorSchemeState) => {
    switch (action.type) {
      case 'setColorScheme':
        {
          draft.currentColorScheme = action.payload.colorSchemeName;
        }
        break;
      case 'setLightness':
        {
          draft.currentLightness = action.payload.lightness;
          const currentColorSchemesByLightness =
            draft.currentLightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.currentColorScheme = currentColorSchemesByLightness[0].name;
        }
        break;
      case 'setPrevNextColorScheme':
        {
          const currentColorSchemesByLightness =
            draft.currentLightness === 'light'
              ? draft.lightColorSchemes
              : draft.darkColorSchemes;
          draft.currentColorScheme = getNextPrevColorScheme(
            currentColorSchemesByLightness,
            draft.currentColorScheme,
            action.payload.direction
          );
        }
        break;
    }
  });

export const colorSchemeReducerInitialiser = (
  colorSchemes: colourShemeAndMeta[]
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
    currentColorScheme: darkColorSchemes[0].name,
    currentLightness: 'dark',
    lightColorSchemes,
    darkColorSchemes,
  };
};

export const useDispatchActions = (dispatch: Dispatch<ColorSchemeAction>) => {
  const setCurrentColorScheme = useCallback(
    (colorSchemeName: colourShemeAndMeta['name']) => {
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
      type: 'setPrevNextColorScheme',
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
